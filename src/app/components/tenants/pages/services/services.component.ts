import { Component, OnInit } from '@angular/core';
import { IPlan } from 'src/app/Models/tenants';
import { SuperAdminService } from 'src/app/services/super-admin.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  plans!:IPlan[]
  planStatus!:boolean
  constructor(
    private readonly superAdminService:SuperAdminService
  ){}
  ngOnInit(): void {
    this.planStatus = false
    this.fetchPlans()
  }
  fetchPlans(){
    this.superAdminService.fetchPlans().subscribe({
      next:(res)=>{
        this.plans = res.data || []
        if(this.plans.length >0){
          this.planStatus = true
        }
      },
      error:(err)=>{
        console.log('Error Fetching Plans');
      }
    })
  }
}
