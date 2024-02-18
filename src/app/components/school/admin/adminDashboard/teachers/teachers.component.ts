import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { nameValidators, passwordValidators } from 'src/app/shared/validators';
import { validateBytrimming } from 'src/app/helpers/validations';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  form!:FormGroup
isSubmitted:boolean= false
tenantId!:string
tenantId$= this.store.select(pipe(selectTenantId))

constructor(
  private readonly formBuilder:FormBuilder,
  private schoolAdminService:SchoolAdminService,
  private readonly router:Router,
  private readonly store:Store
){}
  ngOnInit(): void {
  this.form = this.formBuilder.group({
    name :['',validateBytrimming(nameValidators)],
    userid:['',validateBytrimming(nameValidators)],
    password:['',validateBytrimming(passwordValidators)]

  })

  this.tenantId$.subscribe((id)=>{    
    if(id)
      this.tenantId = id
    })
}

submit(){
console.log('hee');

  this.isSubmitted = true
  if(this.form.valid){
    const data  = this.form.getRawValue()
    console.log(data);
    
    this.schoolAdminService.addTeachers(data.name,this.tenantId).subscribe({
next:()=>{
  console.log('dsds');
  
}
    })
  }
}

}
