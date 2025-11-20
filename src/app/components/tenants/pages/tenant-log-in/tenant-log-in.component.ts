import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { validateBytrimming } from 'src/app/helpers/validations';
import { TenantService } from 'src/app/services/tenant.service';
import { emailValidators, passwordValidators } from 'src/app/shared/validators';
import { saveTenantOnStore } from 'src/app/states/tenant/tenant.actions';


@Component({
  selector: 'app-tenant-log-in',
  templateUrl: './tenant-log-in.component.html',
  styleUrls: ['./tenant-log-in.component.css']
})
export class TenantLogInComponent implements OnInit{
  isSubmitted:boolean = false
  form!:FormGroup

  constructor(
  private readonly formBuilder:FormBuilder,
  private readonly tenatnService:TenantService,
  private readonly router:Router,
  private readonly store:Store,
  private readonly toastr:ToastrService
  ){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['',[validateBytrimming(emailValidators)]],
      password:['',[validateBytrimming(passwordValidators)]]
    })
  }
  onSubmit(){
    this.isSubmitted =true
    if(this.form.valid){
      const data = this.form.getRawValue()
      this.tenatnService.login(data.email,data.password).subscribe({
        next:(res:any)=>{
          console.log(res, 'res from login');
          this.store.dispatch(saveTenantOnStore({tenantDetails: res.data.emailDb}))
          localStorage.setItem('tenantJwt',res.data.accessToken)
            this.toastr.success('Login Successfully')
            void this.router.navigate(['/tenant'])
          },
          error:(err:any)=>{
            this.toastr.error('Login Failed')
            console.log(err)
          }          
    })
  }
  }

  goBack(): void {
    void this.router.navigate(['/tenant'])
  }
}
