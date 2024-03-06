import { Component } from '@angular/core';
import { IStudent } from 'src/app/Models/student';
import { StudentService } from '../../../services/student.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { selectStudentData, selectStudentEmail, selectTenantId } from 'src/app/states/school/school.selector';
import { pipe } from 'rxjs';
import { SubjectName, SubjectsDoc, classes } from 'src/app/Models/subject';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
studentData!:IStudent
studentEmail!:string
tenantId!:string
classNum!:string
classData!:SubjectsDoc[]
studentEmail$ = this.store.select(pipe(selectStudentEmail))
tenantId$=this.store.select(pipe(selectTenantId))

constructor(
  private readonly formBuilder:FormBuilder,
  private studentService:StudentService,
  private router:Router,
  private store:Store
){}
ngOnInit():void{
  this.store.select(selectStudentEmail).subscribe(email =>{
    if(email){
      // console.log('email:',email);
      this.studentEmail = email
      
    }
  });
  this.tenantId$.subscribe((id)=>{
    if(id){
      this.tenantId = id
    }
  })

  this.studentService.fetchStudentData(this.tenantId,this.studentEmail).subscribe({
    next:(res=>{
      console.log('res.classNum:',res.classNum);
      
      this.classNum = res.classNum
      this.fetchSubjects()
    })
  })
  
  
}
fetchSubjects(){
  console.log('classNum',this.classNum);
  this.studentService.fetchSubjects(this.classNum,this.studentEmail,this.tenantId).subscribe({
    next:(res=>{
    this.classData = res     
    })
  })
}
}
