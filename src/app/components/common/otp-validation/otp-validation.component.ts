import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
}
