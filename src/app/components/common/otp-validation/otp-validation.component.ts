import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-otp-validation',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.css']
})
export class OtpValidationComponent {
@Input() otpControl:AbstractControl|null = null
@Input() isSubmitted:boolean = false 
@Input() timerStr ='01:00'
@Input() showOTPResend = false
@Output() OTPResend = new EventEmitter()

resendOTP ():void{
  this.OTPResend.emit()
}
}
