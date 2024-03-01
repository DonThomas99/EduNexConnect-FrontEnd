import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { validateBytrimming } from 'src/app/helpers/validations';
import { classValidators, emailValidators, mobileValidators, nameValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{
 form!:FormGroup;
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


this.form=this.formBuilder.group({
      email:['',validateBytrimming(emailValidators)],
      name :['',validateBytrimming(nameValidators)],
      class:['',classValidators],
      mobile:['',validateBytrimming(mobileValidators)]

    })
  }
  submit(){
    this.isSubmitted = true
    if(this.form.valid){
      const student = this.form.getRawValue()
      console.log(student);
      this.closeModal()
    }
  }

  closeModal(): void {
    console.log('hee');
    
    const modal = this.el.nativeElement.querySelector('#authentication-modal');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('tabindex', '-1');
    this.form.reset()
    this.isSubmitted= false
  }

}
