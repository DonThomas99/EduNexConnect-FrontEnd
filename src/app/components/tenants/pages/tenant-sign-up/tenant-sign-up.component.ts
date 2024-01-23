import { Component,Inject,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateBytrimming } from 'src/app/helpers/validations';
import { emailValidators, nameValidators, otpValidators, passwordValidators } from 'src/app/shared/validators';
import {Store}  from '@ngrx/store';
import { SocialAuthService } from '@abacritt/angularx-social-login'; 


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
    // @Inject(SocialAuthService) private readonly authService:SocialAuthService
    @Inject(Store) private readonly store:Store
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:['',[validateBytrimming(nameValidators)]],
      email: ['',[validateBytrimming(emailValidators)]],
      password:['',[validateBytrimming(passwordValidators)]],
      confirmPassword:[''],
      otp:[{value:'',disabled:true}, [validateBytrimming(otpValidators)]]
    }, {validators: this.passwordMatchValidator}  
    );
  }

passwordMatchValidator(control:AbstractControl){
  return control.get('password')?.value === control.get('confirmPassword')?.value? null: {mismatch: true};

}

}
