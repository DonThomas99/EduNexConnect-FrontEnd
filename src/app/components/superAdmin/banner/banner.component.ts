import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IBanner } from 'src/app/Models/tenants';
import { SuperAdminService } from 'src/app/services/super-admin.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit{
  form!:FormGroup
  Ibanner!:IBanner[]
  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly superAdminService:SuperAdminService,
    private readonly toastr:ToastrService
  ){}
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      bannerText:['',[Validators.required]],
      bannerLink:['',[Validators.required]]
    })
    this.fetchBanner()
  }

  fetchBanner(){
this.superAdminService.fetchBanner().subscribe({
  next:(res)=>{
    this.Ibanner = res.data
    console.log(this.Ibanner,'heooe')
  },
  error:(res)=>{
    const msg = res.message as string
    this.toastr.error(msg)
  }
})
  }

  showModal(){}
  deleteBanner(id:string){
    this.superAdminService.deleteBanner(id.toString()).subscribe({
      next:(res)=>{
        this.toastr.success(res.message)
      },error:(res)=>{
        const msg = res.message as string
        this.toastr.error(msg)
      }
    })
  }
  addBanner(){
    if(this.form.valid){
      const value = this.form.getRawValue()
      this.superAdminService.addBanner(value).subscribe({
        next:(res)=>{
          const msg = res.message as string
          this.form.reset()
          this.toastr.success(msg)
          this.fetchBanner()
        },
        error:(res)=>{
          const msg = res.message as string
          this.toastr.error(msg)
        }
      }) 
    }
  }

}
