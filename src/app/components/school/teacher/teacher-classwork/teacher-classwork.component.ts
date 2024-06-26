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
import { IMat, IMatAsmnt, IMaterials } from 'src/app/Models/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConfirmationDialogComponent } from 'src/app/components/common/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditMaterialsComponent } from 'src/app/components/common/edit-materials/edit-materials.component';
import { AssignmentViewComponent } from '../assignment-view/assignment-view.component';
import { MaterialViewComponent } from '../material-view/material-view.component';

@Component({
  selector: 'app-teacher-classwork',
  templateUrl: './teacher-classwork.component.html',
  styleUrls: ['./teacher-classwork.component.css']
})
export class TeacherClassworkComponent implements OnInit {

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
 uploadsArray!:IMatAsmnt[];
 totalPages!:number
 selectedOption:string = 'Materials';
 pdfArray!:string[]
  selectedItem!:IMatAsmnt
  dateTime: Date | undefined;
tenantId$= this.store.select(pipe(selectTenantId));
teacherData$= this.store.select(pipe(selectTeacherData))
subjectId$ = this.store.select(pipe(selectSubjectId))
subjectId!:string;
assignmentTitle!:string
content!:string
teacherId!:string;
tenantId!:string;
materialForm!:FormGroup;
assignmentForm!:FormGroup;
viewCreate=false
isSubmitted=false
materialTitle!:string
isAssignment:boolean = false
isMaterial:boolean =false
currentPage:number =1
totalItems:number =0
itemsPerPage:number =4;
// dateTime!:string

editorForm!:FormGroup
html!:string

selectedImage!:File
sanitizedUrls!: SafeResourceUrl[];
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
  private dialog:MatDialog,
  private readonly formBuilder:FormBuilder,
  private sanitizer:DomSanitizer,
  private TeacherService:TeacherServiceService,
  private Toastr:ToastrService,
  private readonly router:Router,
  private readonly store:Store,
){
}
  ngOnInit(): void {
    this.assignmentForm = this.formBuilder.group({
      assignmentTitle:['',Validators.required],
      content:['',Validators.required],
      pdf:[null,[Validators.required]],
      dateTime:['',Validators.required]
    })

    this.materialForm = this.formBuilder.group({
      materialTitle :['',Validators.required],
      content:['',Validators.required],
      pdf:[null,[Validators.required]]
    })

    this.tenantId$.subscribe((id)=>{    
      if(id)
        this.tenantId = id
      })
  
      this.teacherData$.subscribe((id)=>{
        if(id){

          this.teacherId = id._id
         
        }
        
        
      })

      this.subjectId$.subscribe((id)=>{
        if(id)
        this.subjectId = id.subjectId as unknown as string                   
      })

      this.TeacherService.fetchMaterials(this.tenantId,this.subjectId,1).subscribe({
        next:(res:IMat)=>{
          this.uploadsArray= res.Mat
          this.totalItems = res.count; // Ensure you have a count property in your response
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) ;
        }
      })
  }


onSelectionChange(option:string){
  this.uploadsArray = [];
  this.selectedOption = option;
  const currentPage =1
  this.currentPage = 1
  this.totalPages=0
  this.fetchMaterialsOrAssignments(currentPage);
}

fetchMaterialsOrAssignments(page:number){

  this.totalPages =0
  this.totalItems =0

  if (this.selectedOption === 'Materials') {
    this.TeacherService.fetchMaterials(this.tenantId, this.subjectId, page).subscribe({
      next: (res: IMat) => {
        this.uploadsArray = res.Mat;
        this.totalItems = res.count; // Ensure you have a count property in your response
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) ;
      
        
      }
    });
 } else {
    this.TeacherService.fetchAssignments(this.tenantId, this.subjectId, page).subscribe({
      next: (res: IMat) => {
        this.uploadsArray = res.Mat;
        this.totalItems = res.count; // Ensure you have a count property in your response
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      }
    });
 }
}

  uploadMaterial(){   
    this.isSubmitted=true     
    if(this.materialForm.valid){
      this.materialForm.get('subjectId')?.setValue(this.subjectId)
      this.materialForm.get('tenantId')?.setValue(this.tenantId)
      this.materialForm.get('teacherId')?.setValue(this.teacherId)        
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
    this.materialForm.reset()

    } else {
      const msg = 'Error sending from frontend'
      this.Toastr.error(msg)
    }
    this.materialForm.reset()
  }

 
  resetMaterialForms(){
    this.materialForm.reset()
    this.assignmentForm.reset()
  }
  uploadAssignment(){
    this.isSubmitted =true
// this.assignmentForm.get('content')
    if(this.assignmentForm.valid){
  const data = this.assignmentForm.getRawValue()  
  this.TeacherService.uploadAssignment(this.tenantId,this.subjectId,this.teacherId,data).subscribe({
    next:(res:Res)=>{
      const msg = res.message
      this.Toastr.success(msg)
      this.assignmentForm.reset()
    },error:(err:Res)=>{
      const msg = err.message
      this.Toastr.error(msg)
    this.assignmentForm.reset()
    }
  })
}
  }

toggleAssignment(){ 
  this.isAssignment = true
  const assignments = document.getElementById('assignments') as HTMLDialogElement
  assignments.showModal(); 
}
toggleMaterial(){
  this.isMaterial = true
const materials = document.getElementById('materials') as HTMLDialogElement
materials.showModal();
  
}

  openModal(item:IMatAsmnt){

    this.selectedItem = item
        
    this.sanitizedUrls = item.pdf.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
        if('materialTitle' in item){
          const dialogRef = this.dialog.open(MaterialViewComponent,{
            data:{material:item},
            width:'80%',
            height:'70%'
          } )
        } else{
          const dialogRef = this.dialog.open(AssignmentViewComponent,{
            data:{material:item},
            width:'80%',
            height:'85%'
          } )
        }
      }
      openMenu(event:MouseEvent){
        event.stopPropagation();
      }

      deleteItem(item:IMatAsmnt){
        let name=''
        let assignmentId =''
        let materialId = ''

        if(item.materialTitle){
            name = item.materialTitle
            materialId = item._id
          } else{
          name = item.assignmentTitle
          assignmentId = item._id
        }
        const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
          data:{message:`Are you sure you want to delete the ${name}`}
        })

        dialogRef.afterClosed().subscribe(result =>{
          if(result){
                        this.TeacherService.deleteAssignments(this.tenantId,assignmentId).subscribe({
                          next:(res:Res)=>{
                            const message = res.message
                            this.Toastr.success(message)
                          },error:(res:Res)=>{
                            const message = res.message
                            this.Toastr.error(message)
                          }
                        })
          }
        })

      }

      editItem(item:IMatAsmnt){ 
        const dialogRef = this.dialog.open(EditMaterialsComponent,{
          data:{material:item}
        } )
        dialogRef.afterClosed().subscribe(result =>{
          if(result){
            window.location.reload();
          }
        })
      }

      onFileChange(event:any){
        console.log(this.materialForm);
        
        if(event.target.files && event.target.files.length > 0){
          const file = event.target.files[0]   
          if (this.imageMimeTypes.includes(file.type)) {
            if(this.isMaterial){
              this.materialForm.get('pdf')?.setValue(file)
            } else if(this.isAssignment){
              this.assignmentForm.get('pdf')?.setValue(file)
            }
            // this.pdfArray.push(file.name)         
            //  this.materialForm.get('id')?.setValue(this.tenantId)
         }    
        }
      }

      viewSubmissions(){
        console.log(this.selectedItem._id);
        // this.router.navigateByUrl(`school/teacher/valuation/${this.selectedItem._id}`)
        this.router.navigate(['school/teacher/valuation',this.selectedItem._id])
        
      }


viewPdf(){
  const pdfModal = document.getElementById('view-pdf') as  HTMLDialogElement;
  pdfModal.showModal()
}
closePdf(){
  this.sanitizedUrls=[]
}

previousPage(){  
  if (this.currentPage > 1) {
    this.currentPage--;
    this.fetchMaterialsOrAssignments(this.currentPage);
 }
}

nextPage(){  
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.fetchMaterialsOrAssignments(this.currentPage)
 }
}

}
