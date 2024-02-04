import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { passwordMatchValidator, validateBytrimming } from 'src/app/helpers/validations';
import { passwordValidators } from 'src/app/shared/validators';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TenantService } from 'src/app/services/tenant.service';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})


export class ChangePasswordComponent implements OnInit {
  email!:string 
  tenantData$=this.store.pipe(select(selectTenantDetails))
passwordForm!:FormGroup
  constructor(
    @Inject(HttpClient) private readonly http:HttpClient,
    @Inject(Router) private readonly router:Router,
    @Inject(FormBuilder) private readonly formBuilder:FormBuilder,
    @Inject(Store) private readonly store:Store,
    @Inject(TenantService) private readonly tenantService:TenantService
    ){
}

  ngOnInit(): void {

    this.tenantData$.subscribe((tenant)=>{
      if(tenant)
    this.email = tenant.email
    })
this.passwordForm= this.formBuilder.group({
  currentPassword:['',validateBytrimming(passwordValidators)],
  newPassword:['',validateBytrimming(passwordValidators)],
  repeatPassword:['',validateBytrimming(passwordValidators)]
},{validators:passwordMatchValidator})
  }


  submit(){
if(this.passwordForm.valid){
  let data = this.passwordForm.getRawValue()
  data.email = this.email 
  this.tenantService.updatePassword(data).subscribe({
    next:()=>{
      console.log('rgseg');
      
      Swal.fire({
        icon: 'success',
        title: 'Password Updated!',
        text: 'The password was updated successfully.',
      }).then(()=>{
        this.router.navigate(['/tenant/dashboard'])
      })
    }
  })
}
  }

}
