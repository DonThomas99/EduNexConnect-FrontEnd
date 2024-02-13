import { Component,Inject,OnDestroy,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator, validateBytrimming } from 'src/app/helpers/validations';
import { emailValidators, nameValidators, otpValidators, passwordValidators,addressValidators, zipValidators, mobileValidators } from 'src/app/shared/validators';
import {Store}  from '@ngrx/store';
import { IApiTenantAuthRes, ITenantAuth } from 'src/app/Models/tenants';
import { MAX_OTP_LIMIT, OTP_RESEND_MAX_TIME, OTP_TIMER } from 'src/app/shared/constants';
import { formatTime } from 'src/app/helpers/timer';
import Swal from 'sweetalert2';
import { TenantService } from 'src/app/services/tenant.service';


@Component({
  selector: 'app-tenant-sign-up',
  templateUrl: './tenant-sign-up.component.html',
  styleUrls: ['./tenant-sign-up.component.css']
})
export class TenantSignUpComponent implements OnInit, OnDestroy {
  form!:FormGroup
  message!:string
  resendOtp!:boolean
  isSubmitted = false
  showOtpField = false
  remainingTime = 0
  formattedTime: string ='01:00'
  otpResendCount:number =0
  showOTPResend: boolean = true
  timer = setTimeout(()=>{},0)
  constructor(
    @Inject(HttpClient) private readonly http:HttpClient,
    @Inject(Router) private readonly router:Router,
    @Inject(FormBuilder) private readonly formBuilder:FormBuilder,
    @Inject(Store) private readonly store:Store,
    @Inject(TenantService) private readonly tenantService:TenantService,
    
    ){
    }
    ngOnDestroy(): void {
      clearInterval(this.timer)
    }
    ngOnInit(): void {
      this.resendOtp = true
      this.form=this.formBuilder.group({
        name:['',[validateBytrimming(nameValidators)]],
        email: ['',[validateBytrimming(emailValidators)]],
      mobile:['',[validateBytrimming(mobileValidators)]],
      state:['',[validateBytrimming(nameValidators)]],
      school:['',[validateBytrimming(nameValidators)]],
      city:['',[validateBytrimming(nameValidators)]],
      address:['',[validateBytrimming(addressValidators)]],
      zip:['',[validateBytrimming(zipValidators)]],
      password:['',[validateBytrimming(passwordValidators)]],
      confirmPassword:['',],
      otp:[{value:'',disabled:true}, [validateBytrimming(otpValidators)]]
    }, {validators: passwordMatchValidator}  
    );

  }


startTimer():void{
  this.remainingTime = OTP_TIMER
  this.timer = setInterval(()=>{

    this.remainingTime--;
    console.log('remaining time : ', this.remainingTime);
    
    if(this.remainingTime <=0){
      clearInterval(this.timer);
      console.log(this.timer);
    console.log('OTP expired');
        
    }
        this.formattedTime = formatTime(this.remainingTime)
  },1000)//Update every second
} 

resendOTP():void{
this.resendOtp = false
  if(this.otpResendCount < MAX_OTP_LIMIT){
    this.tenantService.resendOtp().subscribe({
      next:()=>{
        this.resendOtp =true
        console.log('otp successfully resent');
        void Swal.fire('OTP sent','Check your mail for OTP', 'success');
        this.startTimer()
        this.otpResendCount++
      }
    })
  } else {
    void Swal.fire('Oops!','Maximum resend attempts reached','warning')
    this.showOtpField = false
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
  this.tenantService.saveTenantTemp(tenant).subscribe({
    next:(res:any)=>{
      console.log(res);
      
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

    },
    error:(err)=>
    {
      console.log(err);
      
    }
  })
} else if(!this.form.invalid && this.showOtpField){ // Write otp field in html
  const tenant = this.form.getRawValue()
  console.log(tenant);
  console.log(tenant.otp);
  const otp = tenant.otp
this.tenantService.verifyOtp(otp).subscribe({
  next:(res:any)=>{
    localStorage.removeItem('tenantAuthToken')
    console.log("idhisd");
    
      void this.router.navigate(['/tenant/signin'])
  },
  error:(err)=>{
    console.log(err);
    if(err.status === 409){

      this.message ='Email ID Already Exists' 
    }
    
  }

})  
  
}
else{
  console.log('isValid',this.form.valid);
  console.log('error',this.form);
  
}

}
BackHome(){
  this.router.navigate([''])
}

}
