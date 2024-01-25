import { Component, Input } from '@angular/core';
import { type AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mobile-validation',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './mobile-validation.component.html',
  styleUrls: ['./mobile-validation.component.css']
})
export class MobileValidationComponent {
@Input() mobileControl: AbstractControl|null = null
@Input() isSubmitted:boolean = false
}
