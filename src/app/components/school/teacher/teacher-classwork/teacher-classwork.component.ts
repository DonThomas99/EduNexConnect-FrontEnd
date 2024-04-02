import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { futureDateValidator, validateBytrimming, validatePdf } from 'src/app/helpers/validations';
import { addressValidators } from 'src/app/shared/validators';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { Store } from '@ngrx/store';
import { Observable, map, pipe } from 'rxjs';
import { selectTenantId,selectSubjectId, selectTeacherData } from 'src/app/states/school/school.selector';
import { Res } from 'src/app/Models/common';
import { ToastrService } from 'ngx-toastr';
import { IMatAsmnt, IMaterials } from 'src/app/Models/material';

@Component({
  selector: 'app-teacher-classwork',
  templateUrl: './teacher-classwork.component.html',
  styleUrls: ['./teacher-classwork.component.css']
})
export class TeacherClassworkComponent implements OnInit {
  selectedItem!:IMatAsmnt
  dateTime: Date | undefined;
tenantId$= this.store.select(pipe(selectTenantId));
teacherData$= this.store.select(pipe(selectTeacherData))
subjectId$ = this.store.select(pipe(selectSubjectId))
subjectId!:string
teacherId!:string;
tenantId!:string;
materialForm!:FormGroup;
assignmentForm!:FormGroup;
viewCreate=false
isSubmitted=false
materialTitle!:string
editorForm!:FormGroup
html!:string
materials!:IMatAsmnt[]
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
      pdf:['',validatePdf],
      dateTime:['',Validators.required]
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
        if(id){

          this.teacherId = id._id
          console.log(this.teacherId);
        }
        
        
      })

      this.subjectId$.subscribe((id)=>{
        if(id)
        this.subjectId = id.subjectId as unknown as string       
      })

      this.TeacherService.fetchMaterials(this.tenantId,this.subjectId,this.teacherId).subscribe({
        next:(res:IMatAsmnt[])=>{
          this.materials= res
        }
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
      this.TeacherService.uploadMaterial(this.tenantId,this.subjectId,this.teacherId,data).subscribe({
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
    this.assignmentForm.reset()
  }
  uploadAssignment(){
    console.log(this.assignmentForm)
if(this.assignmentForm.valid){
  
  const data = this.assignmentForm.getRawValue()
  console.log(data);
  
  this.TeacherService.uploadAssignment(this.tenantId,this.subjectId,this.teacherId,data).subscribe({
    next:(res:Res)=>{
      const msg = res as unknown as string
      this.Toastr.success(msg)
    },error:(err:Res)=>{
      const msg = err as unknown as string 
      this.Toastr.error(msg)
    }
  })
}else{
  console.log(this.assignmentForm.invalid);
  
}
  }



  openModal(item:IMatAsmnt){

    this.selectedItem = item
        
        if('materialTitle' in item){
          const materialModal = document.getElementById('materials-view') as  HTMLDialogElement;
          materialModal.showModal();
        } else{
          const assignmentModal = document.getElementById('assignments-view') as HTMLDialogElement;
          assignmentModal.showModal();
        }
      }
      openMenu(event:MouseEvent){
        event.stopPropagation();
      }

      deleteItem(){

      }

      editItem(){
        
      }

}
