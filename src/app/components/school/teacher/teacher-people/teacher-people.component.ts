import { Component, OnInit } from '@angular/core';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectClassNum, selectSubjectId, selectTeacherData, selectTeacherEmail, selectTenantId } from 'src/app/states/school/school.selector';
import { StudentInfo } from 'src/app/Models/student';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher-people',
  templateUrl: './teacher-people.component.html',
  styleUrls: ['./teacher-people.component.css']
})
export class TeacherPeopleComponent implements OnInit {
  constructor(
    private readonly toastr:ToastrService,
   private readonly teacherService:TeacherServiceService,
    private router:Router,
    private readonly store:Store
  ){}

teacherEmail$= this.store.select(pipe(selectTeacherEmail))
tenantId$ = this.store.select(pipe(selectTenantId))
subjectId$ = this.store.select(pipe(selectSubjectId))
teacherData$= this.store.select(pipe(selectTeacherData))
classNum$ = this.store.select(pipe(selectClassNum))

studentData!:StudentInfo[]
teacherId!:string
subjectId!:string
tenantId!:string
teacherEmail!:string
teacherName!:string
classNum!:string
  ngOnInit(): void {
      this.tenantId$.subscribe((id)=>{    
      if(id)
        this.tenantId = id
      })
  
      this.teacherData$.subscribe((id)=>{
        if(id){

          this.teacherId = id._id
          this.teacherName = id.name
        }
      })
   
      this.subjectId$.subscribe((id)=>{
        if(id)
        this.subjectId = id.subjectId as unknown as string       
      })

      this.classNum$.subscribe((classNum)=>{
        if(classNum){
          this.classNum = classNum.classNum as unknown as string   
        }
      })

      this.teacherService.fetchStudents(this.tenantId,this.classNum).subscribe({
        next:(res:StudentInfo[])=>{
        this.studentData= res                  
        }
      })
  }




}
