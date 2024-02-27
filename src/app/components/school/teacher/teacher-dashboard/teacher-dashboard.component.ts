import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectTeacherEmail, selectTenantId } from 'src/app/states/school/school.selector';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { IteacherData } from 'src/app/Models/teacher';
 
@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  // form!:FormGroup
  teacherEmail!:string
  tenantId!:string
  teacherEmail$= this.store.select(pipe(selectTeacherEmail))
tenantId$ = this.store.select(pipe(selectTenantId))

  constructor(
    private readonly formBuilder:FormBuilder,
    private TeacherService:TeacherServiceService,
    private readonly router:Router,
    private readonly store:Store, 
  ){}
  ngOnInit(): void {
    this.store.select(selectTeacherEmail).subscribe(email => {
      if(email){        
        this.teacherEmail = email;
      }
    });
    this.tenantId$.subscribe((id)=>{    
      if(id)
      this.tenantId = id
  })
  this.TeacherService.fetchTeacherData(this.tenantId,this.teacherEmail).subscribe({
    next:(res:IteacherData)=>{
      console.log(res);
      

    }
  })
  }
}
