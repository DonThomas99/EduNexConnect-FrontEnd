import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { validateBytrimming, validatePdf } from 'src/app/helpers/validations';
import { addressValidators } from 'src/app/shared/validators';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { Store } from '@ngrx/store';
import { Observable, map, pipe } from 'rxjs';
import { selectTenantId,selectSubjectId, selectTeacherData } from 'src/app/states/school/school.selector';
import { Res } from 'src/app/Models/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-teacher-classwork',
  templateUrl: './teacher-classwork.component.html',
  styleUrls: ['./teacher-classwork.component.css']
})
export class TeacherClassworkComponent implements OnInit {
tenantId$= this.store.select(pipe(selectTenantId));
teacherData$= this.store.select(pipe(selectTeacherData))
subjectId$ = this.store.select(pipe(selectSubjectId))
subjectId!:string
tenantId!:string;
materialForm!:FormGroup;
assignmentForm!:FormGroup;
viewCreate=false
isSubmitted=false
materialTitle!:string
editorForm!:FormGroup
html!:string
selectedImage!:File
quillConfig = {
  toolbar:{
    container:[
      ['bold','italic','underline','strike'],
      [{'size':['xsmall','small','medium','large','xlarge']}],
      [{'align':[]}],
      ['clean'],
      ['link','image','video']
    ]
  }
  
}
constructor(
  private readonly formBuilder:FormBuilder,
  private TeacherService:TeacherServiceService,
  private Toastr:ToastrService,
  private readonly router:Router,
  private readonly store:Store,
){
 
}
  ngOnInit(): void {
    this.assignmentForm = this.formBuilder.group({
      assignmentTitle:['',validateBytrimming(addressValidators)],
      content:['',Validators.required],
      pdf:['',validatePdf]
    })
    this.materialForm = this.formBuilder.group({
      materialTitle :['',validateBytrimming(addressValidators)],
      content:['',Validators.required],
      pdf:['',validatePdf]
    })

    this.tenantId$.subscribe((id)=>{    
      if(id)
        this.tenantId = id
      })
  
      this.teacherData$.subscribe((id)=>{
        if(id)
        console.log('heedyutr:',id);
        
      })

      this.subjectId$.subscribe((id)=>{
        if(id)
        this.subjectId = id.subjectId as unknown as string       
      })

  }

  toggleCreateButton(){
    this.viewCreate = !this.viewCreate
  }
  uploadMaterial(){   
    this.isSubmitted=true 

    if(this.materialForm.valid){
      
      const data = this.materialForm.getRawValue()
      console.log(data);
      this.TeacherService.uploadMaterial(this.tenantId,this.subjectId,data).subscribe({
        next:(res:Res)=>{
          const msg = res as unknown as string
          this.Toastr.success(msg)
        },error:(err:Error)=>{
          const msg = err as unknown as string 
          this.Toastr.error(msg)
        }
      })
    }
    this.materialForm.reset()
  }

 
  resetMaterialForms(){
    this.materialForm.reset()
  }
  uploadAssignment(){
if(this.assignmentForm.valid){
  const data = this.assignmentForm.getRawValue()
  this.TeacherService.uploadAssignment(this.tenantId,this.subjectId,data)
}
  }

}
