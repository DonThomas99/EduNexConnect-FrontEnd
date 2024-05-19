import { Component } from '@angular/core';
import { IStudent } from 'src/app/Models/student';
import { StudentService } from '../../../services/student.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { selectStudentData, selectStudentEmail, selectTenantId } from 'src/app/states/school/school.selector';
import { pipe } from 'rxjs';
import { SubjectName, SubjectsDoc, classes, subj } from 'src/app/Models/subject';
import { saveClassNum, saveSubjectId } from 'src/app/states/school/school.actions';

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
classData!:subj[]
totalPages:number =0
currentPage:number = 1
itemsPerPage:number = 3
totalItems:number =0
// studentEmail$ = this.store.select(pipe(selectStudentEmail))
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
          
      this.classNum = res.data.classNum
      this.store.dispatch(saveClassNum({classNum:this.classNum}))
      // this.fetchSubjects(this.currentPage)
      this.studentService.fetchSubjects(this.classNum,this.studentEmail,this.tenantId,this.currentPage).subscribe({
        next:(res=>{
        this.classData = res.subjects
          this.totalItems = res.count
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) ;

        })
      })
    })
  })
}
fetchSubjects(currentPage:number){
  this.studentService.fetchSubjects(this.classNum,this.studentEmail,this.tenantId,currentPage).subscribe({
    next:(res=>{
    this.classData = res.subjects

    })
  })
}
openClass(subjectId:string){
  console.log(subjectId,'hewownso');
  this.store.dispatch(saveSubjectId({subjectId:subjectId}))
  this.router.navigate(['school/student/stream'])
}

previousPage(){
if(this.currentPage > 1){
  this.currentPage --;
  this.fetchSubjects(this.currentPage)
}
}
nextPage(){
if(this.currentPage < this.totalPages){
  this.currentPage ++;
  this.fetchSubjects(this.currentPage)
}
}

}
