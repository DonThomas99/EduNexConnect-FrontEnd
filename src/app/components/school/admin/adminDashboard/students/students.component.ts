import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { validateBytrimming } from 'src/app/helpers/validations';
import { classValidators, emailValidators, mobileValidators, nameValidators } from 'src/app/shared/validators';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';
import { StudentInfo } from 'src/app/Models/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{
  @ViewChild('authenticationModal') modalElement!:ElementRef;
 form!:FormGroup;
 studentData!:StudentInfo[]
 tenantId!:string
 tenantId$= this.store.select(pipe(selectTenantId))

 isSubmitted=false;
constructor(
  private readonly formBuilder:FormBuilder,
  private schoolAdminService:SchoolAdminService,
  private readonly router:Router,
  private readonly store:Store,
  private renderer:Renderer2,
  private el:ElementRef
){

}
  ngOnInit(): void {
    this.tenantId$.subscribe((id)=>{    
      if(id)
      this.tenantId = id
  })
  this.schoolAdminService.fetchStudents(this.tenantId).subscribe({
    next:(res:StudentInfo[])=>{
console.log(res);

    }
  })

this.form=this.formBuilder.group({
      email:['',validateBytrimming(emailValidators)],
      name :['',validateBytrimming(nameValidators)],
      gaurdianName:['',validateBytrimming(nameValidators)],
      classNum:['',classValidators],
      mobile:['',validateBytrimming(mobileValidators)]
    })
  }
  submit(){
    this.isSubmitted = true
    if(this.form.valid){
      const student = this.form.getRawValue()
      console.log('hee:',student);
      
      this.schoolAdminService.addStudent(student,this.tenantId).subscribe({
        next:(res)=>{
          console.log('kindi');
          
        }
      })
      this.closeModal()
    }
  }

  closeModal(): void {
    console.log('hee');
    
    // const modal = this.modalElement.nativeElement;
    const modal = this.el.nativeElement.querySelector('#authentication-modal');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('tabindex', '-1');
    this.form.reset()
    this.isSubmitted= false
  }
  openModal(){
    this.form.reset()
    // this.isSubmitted=false;
  }
 
}
