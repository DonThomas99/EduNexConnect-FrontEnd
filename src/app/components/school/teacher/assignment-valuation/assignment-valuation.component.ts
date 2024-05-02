import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectClassNum, selectTenantId } from 'src/app/states/school/school.selector';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { StudentInfo } from 'src/app/Models/student';
import { Isubmission } from 'src/app/Models/material';
import { Asnmt, Asnmt_url, Res } from 'src/app/Models/common';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateBytrimming } from 'src/app/helpers/validations';
import { emailValidators } from 'src/app/shared/validators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-assignment-valuation',
  templateUrl: './assignment-valuation.component.html',
  styleUrls: ['./assignment-valuation.component.css']
})
export class AssignmentValuationComponent implements OnInit {
  form!:FormGroup
  assignmentId!:string
  tenantId$ = this.store.select(pipe(selectTenantId))
  classNum$ = this.store.select(pipe(selectClassNum))
  classNum!:string
  tenantId!:string
  studentData!:StudentInfo[]
  email!:string  
  sanitizedUrls!: SafeResourceUrl[];
  hasError:boolean = false
  grade!:string

  constructor(
    private sanitizer: DomSanitizer,
    private readonly formBuilder:FormBuilder,
    private readonly ActivatedRoute:ActivatedRoute,
    private readonly store:Store,
    private readonly teacherService:TeacherServiceService,
    private readonly toastr:ToastrService
  ){  }
  
  ngOnInit() {
    this.form =this.formBuilder.group({
      grade:[this.grade,Validators.required],
      studentEmail:['',validateBytrimming(emailValidators)],
      assignmentId:['',Validators.required]
    })

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
  this.email = email
  this.teacherService.fetchSubmissions(email,this.assignmentId,this.tenantId).subscribe({
    next:(res:Asnmt)=>{
      console.log(res.url.file_url);
      
      if(res){
        this.sanitizedUrls = res.url.file_url.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
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
  this.form.get('assignmentId')?.setValue(this.assignmentId)
  this.form.get('studentEmail')?.setValue(this.email)
if(this.form.valid){
  const data = this.form.getRawValue()
  this.teacherService.gradeAssignment(this.tenantId,data).subscribe({
    next:(res:Res)=>{
      const message =  res.message
      this.toastr.success(message)
      this.grade=''
      this.email=''
      this.form.reset()
    },
    error:(res:Res)=>{
      const msg = res.message
      this.toastr.error(msg)
      this.grade=''
      this.email=''
      this.form.reset()
    }
  })

}
  
 }

}
