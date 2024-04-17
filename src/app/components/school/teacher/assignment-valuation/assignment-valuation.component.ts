import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectClassNum, selectTenantId } from 'src/app/states/school/school.selector';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { StudentInfo } from 'src/app/Models/student';


@Component({
  selector: 'app-assignment-valuation',
  templateUrl: './assignment-valuation.component.html',
  styleUrls: ['./assignment-valuation.component.css']
})
export class AssignmentValuationComponent implements OnInit {
  assignmentId!:string
  tenantId$ = this.store.select(pipe(selectTenantId))
  classNum$ = this.store.select(pipe(selectClassNum))
  classNum!:string
  tenantId!:string
  studentData!:StudentInfo[]
  open:boolean = false 

  constructor(
    private readonly ActivatedRoute:ActivatedRoute,
    private readonly store:Store,
    private readonly teacherService:TeacherServiceService
  ){
  }
  ngOnInit() {
    this.ActivatedRoute.params.subscribe((param)=>{
      this.assignmentId = param['assignmentId']
    })
    this.tenantId$.subscribe((id)=>{
this.tenantId = id as unknown as string
})
this.classNum$.subscribe((classNum)=>{
  this.classNum = classNum.classNum as unknown as string
})

this.teacherService.fetchStudents(this.tenantId,this.classNum).subscribe({
  next:(res:StudentInfo[])=>{
  this.studentData= res                      
}
})

 }


 openAssignment(email:string){
  this.open= !this.open
  this.teacherService.fetchSubmissions()
  
  console.log('hee',email);
  
 }

}
