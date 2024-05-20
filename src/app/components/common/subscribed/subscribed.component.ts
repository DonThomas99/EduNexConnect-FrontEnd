import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { TenantService } from 'src/app/services/tenant.service';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';

@Component({
  selector: 'app-subscribed',
  templateUrl: './subscribed.component.html',
  styleUrls: ['./subscribed.component.css']
})
export class SubscribedComponent implements OnInit  {
tenantData$= this.store.select(pipe(selectTenantDetails))
tenantId!:string

  constructor(
    private readonly store:Store,
    private readonly tenantService:TenantService,
    private readonly router:Router
  ){
    
  }
  ngOnInit(): void {
    this.tenantData$.subscribe(data=>{
      if(data){
        this.tenantId = data._id
      }  

    })

  }

  toDashboard(){
this.router.navigateByUrl("/tenant/dashboard")
  }


}
