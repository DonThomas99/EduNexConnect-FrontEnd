import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectClassNum, selectTenantId } from 'src/app/states/school/school.selector';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { StudentInfo } from 'src/app/Models/student';
import { Isubmission } from 'src/app/Models/material';
import { Asnmt_url } from 'src/app/Models/common';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';


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
  open!:boolean  
  sanitizedUrls!: SafeResourceUrl[];
  hasError:boolean = false
  grade!:string

  constructor(
    private sanitizer: DomSanitizer,
    private readonly ActivatedRoute:ActivatedRoute,
    private readonly store:Store,
    private readonly teacherService:TeacherServiceService
  ){  }
  
  ngOnInit() {
    this.open =false
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
  this.teacherService.fetchSubmissions(email,this.tenantId).subscribe({
    next:(res:Asnmt_url)=>{
      if(res){
        this.sanitizedUrls = res.url.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
        const assignmentModal = document.getElementById('view-assignment') as HTMLDialogElement;
        assignmentModal.showModal();

      }
    },
      error:(error)=>{
          this.hasError = true
      }      
  })
  
  console.log('hee',email);
  
 }

 onGradeChange(){
  console.log(this.grade);
  
 }

}
