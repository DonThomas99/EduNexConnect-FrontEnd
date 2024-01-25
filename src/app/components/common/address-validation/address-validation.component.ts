import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-address-validation',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './address-validation.component.html',
  styleUrls: ['./address-validation.component.css']
})
export class AddressValidationComponent {
  @Input() addressControl:AbstractControl|null =null
  @Input() isSubmitted:boolean = false
}
