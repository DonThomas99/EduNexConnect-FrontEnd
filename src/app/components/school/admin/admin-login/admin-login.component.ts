import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SchoolAdminService } from '../../services/school-admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  isSubmitted:boolean = false
  form!:FormGroup
  constructor(
    private readonly formBuilder:FormBuilder,
    private schoolAdminService:SchoolAdminService
  ){}
  ngOnInit(): void {
    
  }
  submit(){

  }

}
