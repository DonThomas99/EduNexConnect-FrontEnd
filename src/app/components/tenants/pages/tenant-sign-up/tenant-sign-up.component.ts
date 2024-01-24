import { Component,Inject,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateBytrimming } from 'src/app/helpers/validations';
import { emailValidators, nameValidators, otpValidators, passwordValidators,addressValidators, zipValidators, mobileValidators } from 'src/app/shared/validators';
import {Store}  from '@ngrx/store';
import { IApiTenantAuthRes, ITenantAuth } from 'src/app/Models/tenants';
import { MAX_OTP_LIMIT, OTP_RESEND_MAX_TIME, OTP_TIMER } from 'src/app/shared/constants';
import { formatTime } from 'src/app/helpers/timer';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tenant-sign-up',
  templateUrl: './tenant-sign-up.component.html',
  styleUrls: ['./tenant-sign-up.component.css']
})
export class TenantSignUpComponent implements OnInit {
  form!:FormGroup
  isSubmitted = false
  showOtpField = false
  remainingTime = 0
  formattedTime: string ='03:00'
  otpResendCount:number =0
  showOTPResend: boolean = true
  constructor(
    @Inject(HttpClient) private readonly http:HttpClient,
    @Inject(Router) private readonly router:Router,
    @Inject(FormBuilder) private readonly formBuilder:FormBuilder,
    @Inject(Store) private readonly store:Store
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:['',[validateBytrimming(nameValidators)]],
      email: ['',[validateBytrimming(emailValidators)]],
      mobile:['',[validateBytrimming(mobileValidators)]],
      state:['',[validateBytrimming(nameValidators)]],
      schoolName:['',[validateBytrimming(nameValidators)]],
      city:['',[validateBytrimming(nameValidators)]],
      address:['',[validateBytrimming(addressValidators)]],
      zip:['',[validateBytrimming(zipValidators)]],
      password:['',[validateBytrimming(passwordValidators)]],
      confirmPassword:['',],
      otp:[{value:'',disabled:true}, [validateBytrimming(otpValidators)]]
    }, {validators: this.passwordMatchValidator}  
    );

  }

passwordMatchValidator(control:AbstractControl){
  return control.get('password')?.value === control.get('confirmPassword')?.value? null: {mismatch: true};

}

startTimer():void{
  this.remainingTime = OTP_TIMER
  const timer = setInterval(()=>{

    this.remainingTime--;
    if(this.remainingTime <=0){
      clearInterval(timer);
      console.log(timer);
    console.log('OTP expired');
        
    }
        this.formattedTime = formatTime(this.remainingTime)
  },1000)//Update every second
} 

resendOTP():void{
  if(this.otpResendCount < MAX_OTP_LIMIT){
    this.http.get('tenant/resendOtp').subscribe({
      next:()=>{
        console.log('otp successfully resent');
        void Swal.fire('OTP sent','Check your mail for OTP', 'success')
      }
    })
  } else {
    void Swal.fire('Oops!','Maximum resend attempts reached','warning')
  }
}

get f():Record<string,AbstractControl>{
  return this.form.controls;
}

onsubmit(): void{
this.isSubmitted =true
console.log(this.form.invalid,this.form.get('confirmPassword'),this.form.get('name'));
if(!this.form.invalid && !this.showOtpField){
  const tenant = this.form.getRawValue()
  this.http.post('tenant/signup',tenant).subscribe({
    next:(res:any)=>{
      localStorage.setItem('tenantAuthToken',res.token)
      this.showOtpField = true
      this.form.get('name')?.disable()
      this.form.get('email')?.disable()
      this.form.get('password')?.disable()
      this.form.get('confirmPassword')?.disable()
      this.form.get('otp')?.enable();
      this.startTimer()
      setTimeout(()=>{
        this.showOTPResend = false
      },OTP_RESEND_MAX_TIME)

    }
  })
} else if(!this.form.invalid && this.showOtpField){
  const tenant = this.form.getRawValue()
  console.log(tenant);
  console.log(tenant.otp);
  const otp = tenant.otp
this.http.post<IApiTenantAuthRes>('tenant/verifyOtp',{otp}).subscribe({
  next:(res:IApiTenantAuthRes)=>{
    localStorage.removeItem('tenantAuthToken')
      void this.router.navigate(['/tenant/login'])
  }
})  
  
}
else{
  console.log('isValid',this.form.valid);
  console.log('error',this.form);
  
}

}

}
