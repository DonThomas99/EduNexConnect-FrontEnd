import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { summary } from 'src/app/Models/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tenantId$ = this.store.select(pipe(selectTenantId))
  tenantId!:string
  teacherCount!:number
  studentCount!:number

  constructor(
    private readonly store :Store,
    private readonly adminService:SchoolAdminService,
    private readonly router:Router
  ){

  }
  ngOnInit(): void {    
    this.tenantId$.subscribe((tenantId)=>{
      this.tenantId = tenantId as unknown as string
    })

    this.adminService.fetchSummary(this.tenantId).subscribe({
      next:(res:summary)=>{
        console.log(res.studentsCount,res.teacherCount);
        this.teacherCount= res.teacherCount
        this.studentCount = res.studentsCount
      }
    })

  }
  teachers(){
this.router.navigate(['/school/admin/dashboard/teachers'])
  }
  students(){
    this.router.navigate(['/school/admin/dashboard/students'])
  }

}
