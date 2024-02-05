import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import { ActivatedRoute } from '@angular/router';
import { ITenantRes } from 'src/app/Models/tenants';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.css']
})
export class TenantDetailsComponent implements OnInit {
  tenantData!:ITenantRes
 constructor(
  private readonly superAdminService:SuperAdminService,
  private route:ActivatedRoute
 ){}
 
  ngOnInit(): void {
    let id = ''
    this.route.queryParams.subscribe(params =>{
       id = params['id']
    })
    this.superAdminService.getTenantDetails(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        
        this.tenantData = res.data
      }
    })
  }



}
