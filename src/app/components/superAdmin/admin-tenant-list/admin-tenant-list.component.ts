import { Component, OnInit } from '@angular/core';
import { ITenantRes } from 'src/app/Models/tenants';
import { SuperAdminService } from 'src/app/services/super-admin.service';

@Component({
  selector: 'app-admin-tenant-list',
  templateUrl: './admin-tenant-list.component.html',
  styleUrls: ['./admin-tenant-list.component.css']
})
export class AdminUserListComponent implements OnInit {
 tenantList:ITenantRes[]=[]
 TenantLen:number =0 
 constructor(
    private readonly superAdminService:SuperAdminService
  ){
  }
  ngOnInit(): void {
this.superAdminService.TenantList().subscribe({
  next:(res)=>{
    console.log(res);
    
    this.tenantList=res.data.arr
    this.TenantLen= res.data.len
  }
})
  }
  

}
