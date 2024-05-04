import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IteacherData } from 'src/app/Models/teacher';
import { validateBytrimming } from 'src/app/helpers/validations';
import { emailValidators, nameValidators } from 'src/app/shared/validators';
import { Res } from 'src/app/Models/common';

@Component({
 selector: 'app-edit-teacher',
 templateUrl: './edit-teacher.component.html',
 styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent {
 teacherId!:string 
 editTeacherForm!: FormGroup;
 tenantId!:string
 isUpdating =false
 teacher!: IteacherData;
initialFormValues!:Partial<IteacherData>
 constructor(
    private readonly formBuilder: FormBuilder,
    private readonly schoolAdminService: SchoolAdminService,
    private readonly toastr: ToastrService,
    public dialogRef: MatDialogRef<EditTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tenantId:string, teacher: IteacherData }
 ) {
    this.teacher = this.data.teacher;    
    this.tenantId = this.data.tenantId
    this.teacherId = this.teacher._id

  
      this.editTeacherForm = this.formBuilder.group({
        email: [this.teacher.email,Validators.required],
        name: [this.teacher.name,Validators.required],
        _id: [this.teacher._id,Validators.required]
      });

      this.updateValidators()

 }

 ngOnInit(): void {
  this.initialFormValues = {...this.teacher}
    Object.keys(this.editTeacherForm.controls).forEach(key =>{
      this.editTeacherForm.get(key)?.valueChanges.subscribe(()=>{
        this.updateValidators()
      })
    })


 }

updateValidators(){
if(this.isUpdating) return
this.isUpdating = true
const changedValues = this.getChangedValues()
Object.keys(changedValues).forEach(key =>{
  const control = this.editTeacherForm.get(key)
  if(control){
    control.clearValidators()
    if(key ==='name' && changedValues[key]){
      control.setValidators([validateBytrimming(nameValidators)])
    }
    if(key ==='email' && changedValues[key]){
      control.setValidators([validateBytrimming(emailValidators)])
    }
    // Update the control's value and validity to apply the changes
    control.updateValueAndValidity()
  }
  this.isUpdating = false
})
}

getChangedValues():Partial<IteacherData> {
  const changedValues:Partial<IteacherData> ={}
  if(this.editTeacherForm && this.initialFormValues){
    Object.keys(this.editTeacherForm.value).forEach(key => {
      if (this.editTeacherForm.value[key] !== this.initialFormValues[key as keyof IteacherData]) {
        changedValues[key as keyof IteacherData] = this.editTeacherForm.value[key];
      }
    });
  }
  return changedValues
}

 onSubmit(){
  const changes = this.getChangedValues()
  this.schoolAdminService.updateTeacherData(this.tenantId,this.teacherId,changes).subscribe({
next:(res:Res)=>{
  const message = res.message
  this.toastr.success(message)
  this.dialogRef.close(true)
}, 
error:(res:Res)=>{
  const message = res.message
  this.toastr.error(message)
}
  })
  
 }
}
