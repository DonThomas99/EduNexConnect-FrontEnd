import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { emailValidators, nameValidators, passwordValidators } from 'src/app/shared/validators';
import { validateBytrimming } from 'src/app/helpers/validations';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';
import { IApiRes } from 'src/app/Models/common';
import { classSubjects, subjects } from 'src/app/Models/subject';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
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
){}
  ngOnInit(): void {
  this.form = this.formBuilder.group({
    email:['',validateBytrimming(emailValidators)],
    name :['',validateBytrimming(nameValidators)],
    

  })

  this.tenantId$.subscribe((id)=>{    
    if(id)
      this.tenantId = id
    })


    this.schoolAdminService.fetchClasses(this.tenantId).subscribe({
      next:(res:classSubjects[])=>{
        
        this.classNsubjects= res
      }
    })
  

}
selectClass(classNumber: string) {
  console.log('ufff');
  
  // Find the selected class in the classNsubjects array
  const selectedClass = this.classNsubjects.find(c => c.classNumber === classNumber);
  if (selectedClass) {
    // Populate the subjects dropdown with subjects from the selected class
    this.selectedClassSubjects = selectedClass.subjects;
    this.selectedClass = classNumber;
  }
}

selectedSubj(classNumber:string){
  console.log('duhhh');
  
}


toggleClassDropdown() {
    this.isClassDropdownOpen = !this.isClassDropdownOpen;
}

submit() {

  console.log(this.form.valid);
  
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
      next: (res: any) => {
        console.log('Response:', res);
        // Handle response as needed
      },
      error: (error: any) => {
        console.error('Error:', error);
        // Handle error
      }
    });
  }
}


}
