import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { IMatAsmnt, Isubmission } from 'src/app/Models/material';
import { selectAssignment, selectStudentData, selectTenantId } from 'src/app/states/school/school.selector';
import { StudentService } from '../../../services/student.service';
import { Asnmt_url, Res } from 'src/app/Models/common';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-student-assignment-detail',
  templateUrl: './student-assignment-detail.component.html',
  styleUrls: ['./student-assignment-detail.component.css']
})
export class StudentAssignmentDetailComponent implements OnInit {
  isSubmitted:boolean = false
  imageMimeTypes = [
    'image/apng',
    'image/avif',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
    'application/pdf'
 ];
 url!:string[]
  uploadForm!:FormGroup;
  assignmentItem!:IMatAsmnt;
  assignmentId!:string;
  studentEmail!:string;
  tenantId!:string;
  tenantId$ = this.store.select(pipe(selectTenantId))
  student$ = this.store.select(pipe(selectStudentData))
  assignmentItem$ = this.store.select(pipe(selectAssignment))
  sanitizedUrls!: SafeResourceUrl[];
  constructor(
    private sanitizer: DomSanitizer,
    private platform :Platform,
    private readonly toastr:ToastrService,
    private formBuilder:FormBuilder,
    private readonly store:Store,
    private readonly studentService:StudentService
  ){
  }
  ngOnInit(): void {
    this.tenantId$.subscribe((tenantId)=>{
      this.tenantId = tenantId as unknown as string
    })
    this.student$.subscribe((student)=>{
      this.studentEmail = student.email      
    })
    this.assignmentItem$.subscribe((assignment)=>{
      this.assignmentItem = assignment
      this.assignmentId = assignment._id
    })
    this.uploadForm = this.formBuilder.group({
      id:['',Validators.required],
      studentEmail:['',Validators.required],
      assignmentId:['',[Validators.required]],
      file:[null,[Validators.required]]
    })

    this.studentService.fetchSubmissions(this.tenantId,this.studentEmail,this.assignmentId).subscribe({
      next:(res:Asnmt_url)=>{
    console.log(res.url);
    
        this.sanitizedUrls = res.url.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))

      }
    })

  }
  
  onFileChange(event:any){
    console.log('gtdu');
    
    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0]   
      if (this.imageMimeTypes.includes(file.type)) {
         this.uploadForm.get('file')?.setValue(file)
         this.uploadForm.get('assignmentId')?.setValue(this.assignmentId)
         this.uploadForm.get('studentEmail')?.setValue(this.studentEmail)
         this.uploadForm.get('id')?.setValue(this.tenantId)
     }    
    }
  }
  onSubmit(){
    
    this.isSubmitted =true
    if(this.uploadForm.valid){
      const formValue = this.uploadForm.getRawValue()
      this.studentService.uploadAssignment(this.tenantId,formValue).subscribe({
        next:(res:Asnmt_url)=>{
          const message = res.message as unknown as string
          this.toastr.success(message)
          // this.url = res.url
    this.sanitizedUrls = res.url.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))

        }
      })
    
    }
  }

  deleteFile(i:number){

  }

    

}
