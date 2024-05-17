import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { IPlan, ITransaction } from 'src/app/Models/tenants';
import { TenantService } from 'src/app/services/tenant.service';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
tenantData$= this.store.select(pipe(selectTenantDetails))
tenantTransactions!:ITransaction[]
ExistingPlans!:IPlan[]

constructor(
    private readonly store:Store,
    private readonly tenantService:TenantService
  ){}
  ngOnInit() {
    this.tenantService.fetchPlans().subscribe({
      next:(res)=>{
        this.ExistingPlans= res.data
      }
    })

    this.tenantData$.subscribe(data=>{
      if(data){
        this.tenantTransactions = data.transactions
      }
    })

  }


}
