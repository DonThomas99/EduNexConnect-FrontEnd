import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMatAsmnt } from 'src/app/Models/material';
import { TeacherServiceService } from '../../school/services/teacher-service.service';
import { ToastrService } from 'ngx-toastr';
import { QuillEditorComponent } from 'ngx-quill';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';
import { Res } from 'src/app/Models/common';

@Component({
 selector: 'app-edit-materials',
 templateUrl: './edit-materials.component.html',
 styleUrls: ['./edit-materials.component.css']
})
export class EditMaterialsComponent {
 materialId!: string;
 assignmentId!: string;
 editMaterialForm!: FormGroup;
 material!: IMatAsmnt;
 submissionDate!: Date;
 tenantId$ = this.store.select(pipe(selectTenantId));
 tenantId!: string;
 sanitizedUrls!: SafeResourceUrl[];
 isAssignment!: boolean;
 initialFormValues!: Partial<IMatAsmnt>;
 changedValues!: IMatAsmnt;
 quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{'size': ['xsmall', 'small', 'medium', 'large', 'xlarge']}],
        [{'align': []}],
        ['clean'],
        ['link', 'image', 'video']
      ]
    }
 };

 @ViewChild('description') description!: QuillEditorComponent; // Reference to the Quill editor

 // Add the isUpdating flag
 isUpdating = false;

 constructor(
    public dialogRef: MatDialogRef<EditMaterialsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { material: IMatAsmnt },
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private teacherService: TeacherServiceService,
    private toastr: ToastrService,
    private store: Store
 ) {
    this.material = data.material;
    this.isAssignment = this.determineIfAssignment();
    if (this.isAssignment) {
      this.assignmentId = this.material._id;
    } else {
      this.materialId = this.material._id;
    }

    this.sanitizedUrls = this.material.pdf.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url));

    this.editMaterialForm = this.formBuilder.group({
      materialTitle: [this.material.materialTitle, Validators.required],
      content: [this.material.content, Validators.required], // Initialize with saved content
      pdf: [null, Validators.required],
      submissionDate: [this.material.submissionDate ? new Date(this.material.submissionDate) : null],
      // Add assignmentTitle form control
      assignmentTitle: [this.material.assignmentTitle || '', this.isAssignment ? Validators.required : null] // Conditional required
    });

    this.updateValidators(); // Update validators based on isAssignment
 }

 ngOnInit() {
    this.tenantId$.subscribe((id) => {
      if (id) this.tenantId = id;
    });
    this.initialFormValues = { ...this.editMaterialForm.value } as IMatAsmnt;
    // Subscribe to value changes of each form control
    Object.keys(this.editMaterialForm.controls).forEach(key => {
      this.editMaterialForm.get(key)?.valueChanges.subscribe(() => {
        this.updateValidators();
      });
    });
 }

 closeEditMaterialDialog() {
    // Implementation here
 }

 viewPdf() {
    const pdfModal = document.getElementById('view-pdf') as HTMLDialogElement;
    pdfModal.showModal();
 }

 determineIfAssignment(): boolean {
    return !!this.material.assignmentTitle;
 }

 updateValidators() {
    if (this.isUpdating) return; // Exit if an update is already in progress
    this.isUpdating = true; // Set the flag to true to indicate an update is in progress

    const changedValues = this.getChangedValues();
    Object.keys(changedValues).forEach(key => {
      const control = this.editMaterialForm.get(key);
      if (control) {
        // Clear all validators first to ensure no conflicting validators are present
        control.clearValidators();

        // Apply specific validators based on the key and whether the value has changed
        if (key === 'assignmentTitle' && this.isAssignment && changedValues[key]) {
          // If assignmentTitle has changed and isAssignment is true, make it required
          control.setValidators([Validators.required]);
        }
        if (key === 'materialTitle' && changedValues[key]) {
          // If materialTitle has changed, make it required
          control.setValidators([Validators.required]);
        }
        if (key === 'content' && changedValues[key]) {
          // If content has changed, make it required
          control.setValidators([Validators.required]);
        }
        if (key === 'pdf' && changedValues[key]) {
          // If pdf has changed, make it required
          control.setValidators([Validators.required]);
        }
        if (key === 'submissionDate' && this.isAssignment && changedValues[key]) {
          // If date has changed and isAssignment is true, make it required
          control.setValidators([Validators.required]);
        }

        // Update the control's value and validity to apply the changes
        control.updateValueAndValidity();
      }
    });

    this.isUpdating = false; // Reset the flag after the update is complete
 }

 getChangedValues(): Partial<IMatAsmnt> {
    const changedValues: Partial<IMatAsmnt> = {};
    if (this.editMaterialForm && this.initialFormValues) {
      Object.keys(this.editMaterialForm.value).forEach(key => {
        if (this.editMaterialForm.value[key] !== this.initialFormValues[key as keyof IMatAsmnt]) {
          changedValues[key as keyof IMatAsmnt] = this.editMaterialForm.value[key];
        }
      });
    }
    return changedValues;
 }

 onUpdate() {
    const changes = this.getChangedValues();
    console.log(changes);
    if (this.isAssignment) {
      this.teacherService.updateAssignment(this.tenantId, this.assignmentId, changes).subscribe({
        next: (res: Res) => {
          const message = res.message
          this.toastr.success(message)
          this.dialogRef.close(true);
        }, error:(res:Res) =>{
          const message = res.message
          this.toastr.error(message)
          this.dialogRef.close(false);
        }
      });
    } else {
      this.teacherService.updateMaterial(this.tenantId,this.materialId,changes).subscribe({
        next:(res:Res)=>{
          const message = res.message
          this.toastr.success(message)
          this.dialogRef.close(true);
        }, error:(res:Res) =>{
          const message = res.message
          this.toastr.error(message)
          this.dialogRef.close(false);
        }
        
      })
    }
 }
}
