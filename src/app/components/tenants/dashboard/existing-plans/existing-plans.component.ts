import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { pipe } from 'rxjs';
import { IPlan, ITenantTransaction, ITransaction } from 'src/app/Models/tenants';
import { ConfirmationDialogComponent } from 'src/app/components/common/confirmation-dialog/confirmation-dialog.component';
import { TenantService } from 'src/app/services/tenant.service';
import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';

@Component({
  selector: 'app-existing-plans',
  templateUrl: './existing-plans.component.html',
  styleUrls: ['./existing-plans.component.css']
})
export class ExistingPlansComponent implements OnInit{
  plans!:IPlan[]
  planExists=false
  tenantTransaction!:ITransaction[]
tenantEmail$ = this.store.select(pipe(selectTenantDetails))
tenantId!:string  
constructor(
  private readonly dialog:MatDialog,
    private readonly tenantService:TenantService,
    private store:Store,
    private router:Router,
    private toastr:ToastrService
  ){

  }
  ngOnInit() {
    this.tenantService.fetchPlans().subscribe({
      next:(res)=>{
        this.plans = res.data
       
        
      }
    })
    this.tenantEmail$.subscribe(data =>{
 if(data){
   this.tenantId = data._id 
   this.tenantTransaction= data.transactions
   if(this.tenantTransaction.length>0){
    this.planExists= true    
   }  
 }
    })
  }

  confirmSubscription(plan:IPlan){
    if(this.planExists){
      const message ='Plan Already Exists'
      this.toastr.error(message)
      return
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{message:`Confirm Subscription to ${plan.planName} ?`},
      width:'35%',height:'45%'
    })
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.onSubscribe(plan)
      }
    })
  }
onSubscribe(plan:IPlan){
this.tenantService.subscribePlan(this.tenantId,plan).subscribe({
  next:(res)=>{
    console.log(res);
    
if(res.url){

window.location.href = res.url
}
  }
})
}

}
