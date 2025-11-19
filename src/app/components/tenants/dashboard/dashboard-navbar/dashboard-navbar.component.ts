import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TenantService } from 'src/app/services/tenant.service';
import { deleteTenantFromStore } from 'src/app/states/tenant/tenant.actions';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';


@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent implements OnInit {
  tenantData$=this.store.pipe(select(selectTenantDetails))

  name!:string
  isMobileMenuOpen = false

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
      }
    })
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false
  }

  signOut(){
    localStorage.removeItem('tenantJwt')
    this.store.dispatch(deleteTenantFromStore())
    void this.router.navigate([''])
  }
}
