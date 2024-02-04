import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';import { TenantService } from 'src/app/services/tenant.service';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
name:string= ''
address:string= ''
zip:string =''
state:string = ''
city:string= ''
school:string= ''


  tenantData$=this.store.pipe(select(selectTenantDetails))

  constructor(
    @Inject(HttpClient) private readonly http:HttpClient,
    @Inject(Router) private readonly router:Router,
    @Inject(FormBuilder) private readonly formBuilder:FormBuilder,
    @Inject(Store) private readonly store:Store,
    @Inject(TenantService) private readonly tenantService:TenantService
  ){}
  ngOnInit(): void {
    
    this.tenantData$.subscribe((tenant)=>{
    if(tenant){

      this.name = tenant.name 
      this.address = tenant.address
      this.state = tenant.state
      this.city = tenant.city
      this.zip = tenant.zip
      this.school = tenant.school
    }
    })
  }

  

}
