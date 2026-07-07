import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { deleteTenantFromStore, fetchTenantData } from 'src/app/states/tenant/tenant.actions';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';
import { Router } from '@angular/router';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tenantData$= this.store.pipe(select(selectTenantDetails))
  // tenantId =''
  tenantName=''

constructor(
  private readonly store:Store,
  private readonly router:Router,
  private readonly tenantService:TenantService
){

}
  ngOnInit(): void {
    this.tenantData$.subscribe(tenant =>{
    // this.tenantId=tenant._id
    if(tenant){

      this.tenantName = tenant.name
    }
  })
  }

  signOut(){
    this.tenantService.signOut().subscribe({
      next:()=>{
        this.store.dispatch(deleteTenantFromStore())
        void this.router.navigate([''])
      }
    })
  }
}
