import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperAdminService } from 'src/app/services/super-admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  form!:FormGroup
  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly superAdminService:SuperAdminService,
    private readonly router:Router

  ){}
  ngOnInit(): void {
this.form = this.formBuilder.group({
  email:[''],
  password:['']
})
  }
  submit(){
    if(this.form.valid){
      const values = this.form.getRawValue()
    this.superAdminService.superAdminLogin(values.email,values.password).subscribe({
      next:()=>{
       void this.router.navigate(['/super-admin/dashboard'])
      }
    })
    }
  }
}
