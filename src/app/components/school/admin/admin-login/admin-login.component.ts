import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SchoolAdminService } from '../../services/school-admin.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { validateBytrimming } from 'src/app/helpers/validations';
import { nameValidators, passwordValidators } from 'src/app/shared/validators';
import { selectTenantId } from 'src/app/states/school/school.selector';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  isSubmitted:boolean = false
  form!:FormGroup
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
      password:['',validateBytrimming(passwordValidators)]
    })


    this.tenantId$.subscribe((id)=>{
      console.log(id,'sdofknsoikd');
      
      if(id)
        this.tenantId = id
      })

  }
  submit(){
    console.log('ehdgs');
    
    this.isSubmitted = true 
    if(this.form.valid){
      const data = this.form.getRawValue()
      this.schoolAdminService.login(data.name,data.password,this.tenantId).subscribe({
        next:()=>{
          console.log('hee');
          
        }
        
      })
    }
  }

}
