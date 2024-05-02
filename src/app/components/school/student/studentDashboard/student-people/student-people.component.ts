import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectClassNum, selectTenantId } from 'src/app/states/school/school.selector';
import { StudentInfo } from 'src/app/Models/student';

@Component({
  selector: 'app-student-people',
  templateUrl: './student-people.component.html',
  styleUrls: ['./student-people.component.css']
})
export class StudentPeopleComponent implements OnInit {

  classNum$ = this.store.select(pipe(selectClassNum))
  tenantId$ = this.store.select(pipe(selectTenantId))

  classNum!:string 
  tenantId!:string
  studentData!:StudentInfo[]
 
  constructor(
    private readonly studentService:StudentService,
    private readonly store:Store
  ){

  }
  ngOnInit(): void {
    this.tenantId$.subscribe((id)=>{
      if(id){
        this.tenantId = id
      }
      console.log('tenantId:',this.tenantId);
      
    })
    this.classNum$.subscribe((id)=>{
      if(id)
      this.classNum = id.classNum as  string
    })

    this.studentService.fetchStudents(this.tenantId,this.classNum).subscribe({
      next:(res:StudentInfo[])=>{
      this.studentData= res 
                       
      }
    })

  }

}
