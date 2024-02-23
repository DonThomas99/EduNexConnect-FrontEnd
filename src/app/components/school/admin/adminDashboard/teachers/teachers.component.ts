import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { emailValidators, nameValidators, passwordValidators } from 'src/app/shared/validators';
import { validateBytrimming } from 'src/app/helpers/validations';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';
import Swal from 'sweetalert2';
import { IteacherData } from 'src/app/Models/teacher';
import { classSubjects } from 'src/app/Models/subject';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  hideRest:boolean = false;
  teacherData!:IteacherData[];
  isClassDropdownOpen: boolean = false;
  form!:FormGroup
  isSubmitted:boolean= false
  tenantId!:string
  tenantId$= this.store.select(pipe(selectTenantId))
  classNsubjects!: classSubjects[];
  selectedClassSubjects: string[] = [];
  selectedClass: string = '';
  selectedSubject: string = '';

  constructor(
    private readonly formBuilder:FormBuilder,
    private schoolAdminService:SchoolAdminService,
    private readonly router:Router,
    private readonly store:Store
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['',validateBytrimming(emailValidators)],
      name :['',validateBytrimming(nameValidators)],
    })

    this.tenantId$.subscribe((id)=>{    
      if(id)
        this.tenantId = id
    })
    
    this.schoolAdminService.fetchTeacherData(this.tenantId).subscribe({
      next:(res:IteacherData[])=>{
        this.teacherData = res
        console.log(this.teacherData);
      }
    })

    this.schoolAdminService.fetchClasses(this.tenantId).subscribe({
      next:(res:classSubjects[])=>{
        this.classNsubjects = res
      }
    })
  }

  selectClass(classNumber: string) {
    const selectedClass = this.classNsubjects.find(c => c.classNumber === classNumber);
    if (selectedClass) {
      this.selectedClassSubjects = selectedClass.subjects;
      this.selectedClass = classNumber;
    }
  }

  toggleClassDropdown() {
    this.isClassDropdownOpen = !this.isClassDropdownOpen;
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.valid && this.selectedClass && this.selectedSubject) {
      const formData = this.form.getRawValue();
      const dataToSave = {
        email: formData.email,
        name: formData.name,
        class: this.selectedClass,
        subject: this.selectedSubject
      };
      
      this.schoolAdminService.addTeachers(dataToSave, this.tenantId).subscribe({
        next: (res) => {
          console.log(res);
          void Swal.fire({
            icon:'success',
            title:res,
          }).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.log(error);
          void Swal.fire({
            icon:'error',
            title:error.error,
          }).then(() => {
            window.location.reload();
          });
        }
      });
    }
  }

  sendId(id:string) {}

  hideIt() {
    this.hideRest=!this.hideRest
  }

  reloadPage() {
    window.location.reload();
  }

  deleteSubject(email:string,subject:string){
console.log(email,subject);

  }
}
