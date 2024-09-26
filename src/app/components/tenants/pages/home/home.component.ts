import { AfterViewInit, Component,OnInit } from '@angular/core';
// import{ Emitters} from 'src/app/emitters';
import { HttpClient } from "@angular/common/http"
import { NavigationEnd, Router } from '@angular/router';
import { IBanner } from 'src/app/Models/tenants';
import { SuperAdminService } from 'src/app/services/super-admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  images !:IBanner[]
  constructor(
    private router:Router,
    private readonly superAdminService:SuperAdminService
  ){}
   ngOnInit(): void {
  this.fetchBanner()
  }
  fetchBanner(){
     this.superAdminService.fetchBanner().subscribe({
      next:(res)=>{
      this.images = res.data
      }
    })
  }  

}
