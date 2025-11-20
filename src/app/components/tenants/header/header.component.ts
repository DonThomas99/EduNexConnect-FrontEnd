import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { deleteTenantFromStore, fetchTenantData } from 'src/app/states/tenant/tenant.actions';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';
import { Router } from '@angular/router';

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
  private readonly router:Router
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
    console.log('SignOut called') // Debug log
    try {
      localStorage.removeItem('tenantJwt')
      this.store.dispatch(deleteTenantFromStore())
      this.tenantName = '' // Clear tenant name
      console.log('Cleared JWT and store, navigating...') // Debug log
      void this.router.navigate([''])
    } catch (error) {
      console.error('Error in signOut:', error)
    }
  }
}
