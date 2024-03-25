import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectSubjectId, selectTenantId } from 'src/app/states/school/school.selector';
import { StudentService } from '../../../services/student.service';
import { IMatAsmnt } from 'src/app/Models/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-subject-detail-page',
  templateUrl: './student-subject-detail-page.component.html',
  styleUrls: ['./student-subject-detail-page.component.css']
})
export class StudentSubjectDetailPageComponent implements OnInit {
tenantId!:string
subjectId!:string
uploadsArray!:IMatAsmnt[]
  constructor(
    private datePipe:DatePipe,
    private readonly store : Store,
    private readonly studentService:StudentService
  ){

  }
  tenantId$ = this.store.select(pipe(selectTenantId))
subjectId$ = this.store.select(pipe(selectSubjectId))


  ngOnInit(): void {
    this.tenantId$.subscribe((id)=>{    
      if(id)
        this.tenantId = id
      })
      this.subjectId$.subscribe((id)=>{
        if(id)
        this.subjectId = id.subjectId as unknown as string
      
      })
      this.studentService.fetchMatAsnmt(this.tenantId,this.subjectId).subscribe({
        next:(res:IMatAsmnt[])=>{
          console.log(res);
          this.uploadsArray = res
          
        }
      })
  }

}
