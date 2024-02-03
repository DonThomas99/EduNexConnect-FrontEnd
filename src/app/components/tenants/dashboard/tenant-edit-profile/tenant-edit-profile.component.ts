import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ITenantRes } from 'src/app/Models/tenants';
import { validateBytrimming } from 'src/app/helpers/validations';
import { TenantService } from 'src/app/services/tenant.service';
import { nameValidators, emailValidators, mobileValidators, addressValidators, zipValidators } from 'src/app/shared/validators';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';

@Component({
  selector: 'app-tenant-edit-profile',
  templateUrl: './tenant-edit-profile.component.html',
  styleUrls: ['./tenant-edit-profile.component.css']
})
export class TenantEditProfileComponent implements OnInit {
form!:FormGroup
tenantData$=this.store.pipe(select(selectTenantDetails))
isSubmitted = false
tenant!:ITenantRes
mobile:number = 0
schoolName:string=''
isFormDisabled =false

constructor(
  @Inject(HttpClient) private readonly http:HttpClient,
  @Inject(Router) private readonly router:Router,
  @Inject(FormBuilder) private readonly formBuilder:FormBuilder,
  @Inject(Store) private readonly store:Store,
  @Inject(TenantService) private readonly tenantService:TenantService
){}


toggleForm(){
  this.isFormDisabled = !this.isFormDisabled;
  
  if (this.isFormDisabled === true) {
    this.form.disable();
  } else {
    this.form.enable();
  }
}
ngOnInit(): void {
  this.form = this.formBuilder.group(
    {
      name:['',[validateBytrimming(nameValidators)]],
      email: ['',[validateBytrimming(emailValidators)]],
      mobile:['',[validateBytrimming(mobileValidators)]],
      state:['',[validateBytrimming(nameValidators)]],
      school:['',[validateBytrimming(nameValidators)]],
      city:['',[validateBytrimming(nameValidators)]],
      address:['',[validateBytrimming(addressValidators)]],
      zip:['',[validateBytrimming(zipValidators)]],
    }
    )
    this.toggleForm()
    this.tenantData$.subscribe(t=>{
if(t){
 
  console.log(this.isFormDisabled);
  
  this.tenant = t
  this.mobile=t.mobile
  this.schoolName = t.school

  this.form.get('name')?.setValue(t.name)
  this.form.get('school')?.setValue(t.school)
  this.form.get('address')?.setValue(t.address)
  this.form.get('email')?.setValue(t.email)
  this.form.get('city')?.setValue(t.city)
  this.form.get('zip')?.setValue(t.zip)
  this.form.get('state')?.setValue(t.state)
  this.form.get('mobile')?.patchValue(t.mobile)


  
  
  
}
    })
  }

submit(){

  
}



}
