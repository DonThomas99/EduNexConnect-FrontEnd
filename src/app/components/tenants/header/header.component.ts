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
  isMobileMenuOpen = false

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
      console.log('Tenant name set:', this.tenantName) // Debug log
    } else {
      this.tenantName = '' // Clear when no tenant
      console.log('No tenant data') // Debug log
    }
  })
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false
  }

  signOut(): void {
    this.tenantService.signOut().subscribe({
      next:()=>{
        this.store.dispatch(deleteTenantFromStore())
        this.tenantName = ''
        void this.router.navigate([''])
      }
    })
  }
}
