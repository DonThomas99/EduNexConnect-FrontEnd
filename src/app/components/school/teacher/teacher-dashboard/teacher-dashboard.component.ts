import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectTeacherData, selectTeacherEmail, selectTeacherState, selectTenantId } from 'src/app/states/school/school.selector';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { IteacherData, subjectsNclass } from 'src/app/Models/teacher';
import { SaveTeacherData, saveSubjectId } from 'src/app/states/school/school.actions';
import { SubjectsDoc, classSubjects } from 'src/app/Models/subject';
 
@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  // form!:FormGroup
  classNsubjects!:classSubjects[]
  subjects!:subjectsNclass[]
  teacherData!:IteacherData
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

  this.store.select(selectTeacherData).subscribe(data=>{
if(data){
  this.teacherData = data
  this.classNsubjects = this.teacherData.classNsub.map(classData => ({
    class: classData.classNum,
    subjects: classData.subject
   }));
   
   this.subjects = this.classNsubjects.flatMap(subjectsI =>
    subjectsI.subjects.map(subject => ({
      _id: subject.Id,
      name: subject.name,
      classNum: subjectsI.class // Assuming classNum is obtained from subjectsI
    }))
  );   
}
  })
  }

  Openclass(subjectId:string){
    console.log('hee');
    
this.store.dispatch(saveSubjectId({subjectId:subjectId}))

    
    this.router.navigate(['school/teacher/stream'])

  }
}
