import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IApiadminList, IschoolAdminRes } from 'src/app/Models/schoolAdmin';
import { TenantService } from 'src/app/services/tenant.service';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';
import Swal from 'sweetalert2';

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
        // console.log(this.schoolAdminList);       
      }
    })
    
    this.tenantService.fetchAdminList( this.tenantId).subscribe({
      next:(res)=>{
        console.log('response:',res);
        
        this.schoolAdminList = res.data
      },error:() =>{
        void Swal.fire({
          icon:'error',
          title:'Error',
          text:'Failed to fetch admin list. Please try again later.'
        }) 
      }
    })
  }
  toggleStatus(admins:IschoolAdminRes){
    

  }


}
