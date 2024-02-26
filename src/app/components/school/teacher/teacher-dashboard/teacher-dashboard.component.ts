import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';
import { TeacherServiceService } from '../../services/teacher-service.service';
 
@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  form!:FormGroup
  tenantId!:string
tenantId$= this.store.select(pipe(selectTenantId))

  constructor(
    private readonly formBuilder:FormBuilder,
    private TeacherService:TeacherServiceService,
    private readonly router:Router,
    private readonly store:Store, 
  ){}
  ngOnInit(): void {
    this.TeacherService.fetchTeacherData(this.tenantId)
    this.tenantId$.subscribe((id)=>{    
      if(id)
        this.tenantId = id
      })
  }
  

}
