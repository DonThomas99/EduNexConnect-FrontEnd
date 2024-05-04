import { Component, OnInit,Renderer2,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { emailValidators, nameValidators, passwordValidators } from 'src/app/shared/validators';
import { validateBytrimming } from 'src/app/helpers/validations';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';
import Swal from 'sweetalert2';
import { IteacherData } from 'src/app/Models/teacher';
import { SubjectsDoc, classSubjects } from 'src/app/Models/subject';
import { Res } from 'src/app/Models/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/common/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { EditTeacherComponent } from '../edit-teacher/edit-teacher.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  hideRest:boolean = false;
  teacherData!:IteacherData[];
  isClassDropdownOpen: boolean = false;
  form!:FormGroup
  isSubmitted:boolean= false
  tenantId!:string
  tenantId$= this.store.select(pipe(selectTenantId))
  currentTeacherDetails: IteacherData | null = null;
  classNsubjects!: classSubjects[];
  selectedClassSubjects: SubjectsDoc[] = [];
  selectedClass: string = '';
  selectedSubject: string = '';
  teacherEmail:string ='';
  teacherDataLength=0;
   status!:string;
  selectedSubjectId!:string;
  classSubArray!:SubjectsDoc[]; 

  constructor(
    private dialog:MatDialog,
    private readonly formBuilder:FormBuilder,
    private schoolAdminService:SchoolAdminService,
    private readonly router:Router,
    private readonly store:Store,
    private renderer:Renderer2,
    private el:ElementRef,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['',validateBytrimming(emailValidators)],
      name :['',validateBytrimming(nameValidators)],
    })

    this.tenantId$.subscribe((id)=>{    
      if(id)
        this.tenantId = id
    })
    


    this.schoolAdminService.fetchClasses(this.tenantId).subscribe({
      next:(res:classSubjects[])=>{        
        this.classNsubjects = res
        this.fetchTeacherData()
      }
    })
  }


  fetchTeacherData(){
    this.schoolAdminService.fetchTeacherData(this.tenantId).subscribe({
      next:(res:IteacherData[])=>{
   
        
        this.teacherData = res
        this.teacherDataLength= this.teacherData.length
          
      }
    })

    this.classNsubjects.map(subject =>{
      
    })

this.swapId(this.teacherData,this.classNsubjects)
  }
swapId(teacher:IteacherData[],subjectsData:classSubjects[]){

}

viewDetails(index: number) {
 this.currentTeacherDetails = this.teacherData[index];
 // Assuming my_modal_2 is the ID of your modal element
 const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
 if (modal) {
    modal.showModal();
 }
}


  selectClass(classNumber: string) {
    const selectedClass = this.classNsubjects.find(c => c.class === classNumber);
    if (selectedClass) {
      this.selectedClassSubjects = selectedClass.subjects;
      this.selectedClass = classNumber;
    }
  }

  toggleClassDropdown() {
    this.isClassDropdownOpen = !this.isClassDropdownOpen;
  }

  submit() {
    this.isSubmitted = true;
    if (this.form.valid && this.selectedClass && this.selectedSubject) {
      const formData = this.form.getRawValue();
      const dataToSave = {
        email: formData.email,
        name: formData.name,
        class: this.selectedClass,
        subjectId: this.selectedSubjectId,
        subjectName:this.selectedSubject
      };
      
      this.schoolAdminService.addTeachers(dataToSave, this.tenantId).subscribe({
        next: (res) => {
         
          void Swal.fire({
            icon:'success',
            title:res,
          }).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.log(error);
          void Swal.fire({
            icon:'error',
            title:error.error,
          }).then(() => {
            window.location.reload();
          });
        }
      });
    }
  }

  sendId(id:string) {}

  hideIt() {
    this.hideRest=!this.hideRest
  }

  reloadPage() {
    window.location.reload();
  }

//   deleteSubject(email:string,subject:string){
// console.log(email,subject);

//   }

  openAddSubjectModal() {
    const modal = document.getElementById('add-subject-modal') as HTMLDialogElement;
    if (modal) {
       modal.showModal();
    }
   }

   openAddClassModal() {
    const modal = document.getElementById('add-class-modal') as HTMLDialogElement;
    if (modal) {
       modal.showModal();
    }
   }
   

   closeModal(modalId: string) {
    // this.form.reset();
    this.selectedClass='';
    this.selectedSubject ='';
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
       modal.close();
    }
}

addNewClass(modalId:string) {
  const teacherEmail = (document.getElementById('teacherEmail') as HTMLInputElement).value;
  this.teacherEmail = teacherEmail;
  this.schoolAdminService.addSubToTeacher(this.teacherEmail,this.selectedClass,this.selectedSubjectId,this.selectedSubject,this.tenantId).subscribe({
    next:(res:Res)=>{
      void Swal.fire({
        icon:'success',
        title:res,
      }).then(() => {
        window.location.reload();
      });            
      this.selectedClass='';
      this.selectedSubject ='';
      this.selectedSubjectId ='';
      const modal = document.getElementById(modalId) as HTMLDialogElement;
      if (modal) {
         modal.close();
      }
    },
    
    error: (error) => {
      console.log(error);
      void Swal.fire({
        icon:'error',
        title:error.error,
      }).then(() => {
        window.location.reload();
      });
      this.selectedClass='';
      this.selectedSubject ='';
      const modal = document.getElementById(modalId) as HTMLDialogElement;
      if (modal) {
         modal.close();
      }
    }

    

  });
  

 }
 


expandModal() {
  const modal = this.el.nativeElement.querySelector('.modal');
    this.renderer.addClass(modal, 'modal-expanded');
 }
 
 collapseModal() {
  const modal = this.el.nativeElement.querySelector('.modal');
  this.renderer.removeClass(modal, 'modal-expanded');
 }


 onDropdownToggle(event: Event) {
  const details = event.target as HTMLDetailsElement;
  const modal = this.el.nativeElement.querySelector('.modal')
  if (details.open) {
     // Dropdown is open, expand the modal
     this.renderer.addClass(modal,'modal-expanded');
  } else {
     // Dropdown is closed, return modal to normal size
     this.renderer.removeClass(modal,'modal-expanded');
  }
 }
confirmToggleBlock(email:string,name:string,isBlocked:boolean){
  if(isBlocked){
    this.status = 'Unblock'
  }else{
    this.status = 'Block'
  }
  const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
    data:{message:`Are you sure you want to ${this.status} ${name}`}
  })
dialogRef.afterClosed().subscribe(result =>{
  if(result){
    this.toggleBlock(email)
  }
})

}
 toggleBlock(email:string){
    console.log('block action confirmed');
    this.schoolAdminService.toggleBlock(email,this.tenantId).subscribe({
      next:(res=>{
        const mes = res as unknown as string
        
        this.toastr.success(mes)
        window.location.reload()
      })
    })
 }

 editTeacher(teacher:IteacherData){  
  const dialog = this.dialog.open(EditTeacherComponent,{
    data:{ tenantId:this.tenantId,teacher:teacher},
    width:'60%',
    height:'45%'
  })
  dialog.afterClosed().subscribe(result =>{
    if(result){
      this.ngOnInit()
    }
  })
 }

 deleteSubject(subjectId:string,teacherId:string,classNum:string){
this.schoolAdminService.removeSubject(this.tenantId,classNum,subjectId,teacherId).subscribe({
next:(res:Res)=>{

}
})
 }

}
