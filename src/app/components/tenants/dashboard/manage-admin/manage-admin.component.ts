import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IschoolAdminRes } from 'src/app/Models/schoolAdmin';
import { TenantService } from 'src/app/services/tenant.service';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';

@Component({
  selector: 'app-add-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})
export class ManageAdminComponent implements OnInit{
schoolAdminList:IschoolAdminRes[] =[]
tenantId!:string
tenantData$=this.store.pipe(select(selectTenantDetails))

constructor(
  private readonly tenantService :TenantService,
  private readonly router: Router,
  private readonly store: Store
){}
  ngOnInit(): void {
    this.tenantData$.subscribe((tenant)=>{
      if(tenant){
  
        this.tenantId = tenant._id 
        this.schoolAdminList=tenant.schoolAdmins
        console.log(this.schoolAdminList);
        
        
        
      }
      })

  }
  toggleStatus(admins:IschoolAdminRes){
    

  }


}
