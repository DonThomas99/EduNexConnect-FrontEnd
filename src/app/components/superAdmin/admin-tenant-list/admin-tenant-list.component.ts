import { Component, OnInit } from '@angular/core';
import { ITenantRes } from 'src/app/Models/tenants';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import Swal from 'sweetalert2';

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
    
    this.tenantList=res.data.arr
    this.TenantLen= res.data.len
  }
})
  }
  
  toggleStatus(tenant: ITenantRes): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${tenant.isBlocked ? 'Unblock' : 'Block'} this user!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${tenant.isBlocked ? 'Unblock' : 'Block'} him/her`,
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Assuming you have a method like this in your service
        this.superAdminService.toggleTenantStatus(tenant._id).subscribe({
          next: () => {
            // Update the status locally
            const tenantIdx = this.tenantList.findIndex((t) => t._id === tenant._id);
            if (tenantIdx !== -1) {
              this.tenantList = [
                ...this.tenantList.slice(0, tenantIdx),
                { ...this.tenantList[tenantIdx], isBlocked: !this.tenantList[tenantIdx].isBlocked },
                ...this.tenantList.slice(tenantIdx + 1)
              ];
            }
          }
        });
      }
    });
  }
}


