import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-confirm-password-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-password-validation.component.html',
  styleUrls: ['./confirm-password-validation.component.css']
})
export class ConfirmPasswordValidationComponent {
@Input() confirmPasswordControl:AbstractControl|null = null 
@Input() isSubmitted:boolean = false
}
