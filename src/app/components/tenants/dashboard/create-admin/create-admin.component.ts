import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { passwordMatchValidator, validateBytrimming } from 'src/app/helpers/validations';
import { TenantService } from 'src/app/services/tenant.service';
import { emailValidators, nameValidators, passwordValidators } from 'src/app/shared/validators';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  TenantId!:string
  tenantData$=this.store.pipe(select(selectTenantDetails))

  adminForm!:FormGroup
 errorMessage:string =''
 isSubmitted = false
  constructor(
    @Inject(HttpClient) private readonly http:HttpClient,
    @Inject(Router) private readonly router:Router,
    @Inject(FormBuilder) private readonly formBuilder:FormBuilder,
    @Inject(Store) private readonly store:Store,
    @Inject(TenantService) private readonly tenantService:TenantService
  ){}
  ngOnInit(): void { 

    this.tenantData$.subscribe((tenant)=>{
      if(tenant)
    this.TenantId = tenant._id
    })
    this.adminForm = this.formBuilder.group({
      userid:['',validateBytrimming(nameValidators)],
      password:['',validateBytrimming(passwordValidators)],
      repeatPassword:['',validateBytrimming(passwordValidators)]
    },{validators:passwordMatchValidator})

  }
  submit(){
    if(this.adminForm.valid){
      const {userid,password,repeatPassword} = this.adminForm.value
      this.tenantService.createSchoolAdmin(this.TenantId,userid,password,repeatPassword).subscribe({
        next:(res)=>{
          console.log('hehe',res);
          
        }, error:(err)=>{
          if(err.status === 401){
            this.errorMessage = 'ID already Exists'
          }
        }
      })
    }

  }
}
