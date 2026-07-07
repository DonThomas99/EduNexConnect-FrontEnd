import { Component, OnInit } from '@angular/core';
import { deleteTenantFromStore } from 'src/app/states/tenant/tenant.actions';
import {faDashboard} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit {
  constructor(
    private readonly store:Store,
    private readonly router:Router,
    private readonly tenantService:TenantService
  ){

  }
faDashboard = faDashboard
  
// faPerson = faPerson
  ngOnInit(): void {
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
