import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPlan } from 'src/app/Models/tenants';
import { validateBytrimming } from 'src/app/helpers/validations';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import { nameValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent implements OnInit{
  form!:FormGroup
  plans!:IPlan[]
  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly superAdminService:SuperAdminService,
    private readonly toastr:ToastrService
  ){
    
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount:['',[Validators.required]],
      planName:['',[validateBytrimming(nameValidators)]],
      durationUnit:['',[Validators.required]],
      durationValue:['',[Validators.required]]
    })
this.fetchPlans()
  

  }

  fetchPlans(){
    this.superAdminService.fetchPlans().subscribe({
      next:(res)=>{
        this.plans = res.data
        console.log(this.plans);
                
      }
    })
  }

  addPlan(){
if(this.form.valid){
  const value = this.form.getRawValue()
  this.superAdminService.addPlan(value).subscribe({
    next:(res)=>{
      const msg = res.message as string
      this.toastr.success(msg)
      this.form.reset()
    },
    error:(res)=>{
      const msg = res.message as string
      this.toastr.success(msg)
    }
  })
} else{
  console.log(this.form);
  
}
  }

}
