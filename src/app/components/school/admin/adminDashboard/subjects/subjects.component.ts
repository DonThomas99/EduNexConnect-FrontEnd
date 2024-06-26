import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, pipe, tap, throwError } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { validateBytrimming } from 'src/app/helpers/validations';
import { classValidators, nameValidators } from 'src/app/shared/validators';
import Swal from 'sweetalert2';
import { classSubjects } from 'src/app/Models/subject';
import { MatDialog } from '@angular/material/dialog';
import { ViewSubjectsComponent } from '../view-subjects/view-subjects.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  classNsubjects!: classSubjects[];
  form!: FormGroup;
  isSubmitted: boolean = false;
  tenantId!: string;
  isModalOpen: boolean = false;
  selectedClass: string = '';
  selectedSubject: string = '';
  noSubjects:boolean =false

  tenantId$ = this.store.select(pipe(selectTenantId));

  constructor(
    private dialog:MatDialog,
    private readonly formBuilder: FormBuilder,
    private schoolAdminService: SchoolAdminService,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      class: ['', classValidators],
      subject: ['', validateBytrimming(nameValidators)]
    });

    this.tenantId$.subscribe((id) => {
      if (id) this.tenantId = id;
    });

    this.schoolAdminService.fetchClasses(this.tenantId).subscribe({
      next: (res: classSubjects[]) => {
        this.classNsubjects = res;
        if(this.classNsubjects.length ==0)
            this.noSubjects = true
      }
    });
  }

  openConfirmationModal(classNumber: string, subject: string): void {
    // Set the selected class and subject
    this.selectedClass = classNumber;
    this.selectedSubject = subject;
    // Show the confirmation modal
    const modal = document.getElementById('confirmation_modal') as HTMLDialogElement;
    modal.showModal();
  }

  viewSubjects(subjects:classSubjects){
       
    const dialogRef = this.dialog.open(ViewSubjectsComponent,{
      data:{subject:subjects,
        classNumber:subjects.class,
        tenantId:this.tenantId
      },
      width:'80%',
      height:'70%'
    } )
  }


  closeConfirmationModal(): void {
    
    this.selectedClass = '';
    this.selectedSubject = '';
    const modal = document.getElementById('confirmation_modal') as HTMLDialogElement;
    modal.close();
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const data = this.form.getRawValue();
      this.schoolAdminService.addSubjects(data.class, data.subject, this.tenantId).subscribe({
        next: () => {
          void Swal.fire({
            icon: 'success',
            title: 'Subject Added Successfully',
          }).then(() => {
            window.location.reload();
          });
        }
      });
    }
  }
}
