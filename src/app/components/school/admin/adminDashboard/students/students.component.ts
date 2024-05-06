import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { validateBytrimming } from 'src/app/helpers/validations';
import { classValidators, emailValidators, mobileValidators, nameValidators } from 'src/app/shared/validators';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';
import { IStudent, StudentInfo } from 'src/app/Models/student';
import { classSubjects, classes } from 'src/app/Models/subject';
import { ClassComponent } from '../class/class.component';
import { MatDialog } from '@angular/material/dialog';
import { Res } from 'src/app/Models/common';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{
  @ViewChild('authenticationModal') modalElement!:ElementRef;
 form!:FormGroup;
 studentData!:StudentInfo[]
 tenantId!:string
 tenantId$= this.store.select(pipe(selectTenantId))
//  groupedStudents:string[]=[]
// groupedStudents: Record<string, StudentInfo[]> = {}; 
students!:IStudent[]
modalTitle!:string
modalContent!:string
isSubmitted=false;
classNsubjects!: classSubjects[];
filteredStudents!:IStudent[];
classNumber!:string;
selectedOption: string ='Select Class' ;

constructor(
  private dialog:MatDialog,
  private toastr:ToastrService,
  private readonly formBuilder:FormBuilder,
  private schoolAdminService:SchoolAdminService,
  private readonly router:Router,
  private readonly store:Store,
  private renderer:Renderer2,
  private el:ElementRef
){

}
  ngOnInit(): void {
    this.tenantId$.subscribe((id)=>{    
      if(id)
      this.tenantId = id
  })

  this.schoolAdminService.fetchClasses(this.tenantId).subscribe({
    next: (res: classSubjects[]) => {
    
      const sortedRes = res.sort((a:classSubjects, b:classSubjects) => +a.class - +b.class);

      this.classNsubjects = sortedRes;
    }
  });
  
this.schoolAdminService.fetchStudents(this.tenantId).subscribe({
 next: (res: IStudent[]) => {
this.students = res
 }
})

this.form=this.formBuilder.group({
      email:['',validateBytrimming(emailValidators)],
      name :['',validateBytrimming(nameValidators)],
      gaurdianName:['',validateBytrimming(nameValidators)],
      classNum: [this.selectedOption || '', classValidators],
      mobile:['',validateBytrimming(mobileValidators)]
    })
  }
  submit(){
        
    this.isSubmitted = true
    if(this.form.valid){
      const student = this.form.getRawValue()      
      this.schoolAdminService.addStudent(student,this.tenantId).subscribe({
        next:(res:Res)=>{
          // window.location.reload()
          const message = res.message
          void Swal.fire({
            icon:'success',
            title:message
          }).then(
            window.location.reload
          )
        }
      })
      this.closeModal()
    }
  }

  closeModal(): void {   
    // const modal = this.modalElement.nativeElement;
    const modal = this.el.nativeElement.querySelector('#authentication-modal');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('tabindex', '-1');
    this.form.reset()
    this.isSubmitted= false
  }

   openModalWithClassNumber(classNumber: string){
    this.classNumber = classNumber
    this.filteredStudents =  this.students.filter(student => student.classNum === classNumber)
    
    const dialogRef = this.dialog.open(ClassComponent,{
      data:{material:this.filteredStudents,
        classNumber:this.classNumber,
        tenantId:this.tenantId,
        classNsub:this.classNsubjects

      },
      width:'100%',
      height:'70%'
    } ) 
}
showModal(id:string){
  const modal = document.getElementById(id) as HTMLDialogElement  ;
  if (modal) {
     modal.showModal();
  }
 }

 

 updateSelectedOption(option: string) {
    this.form.get('classNum')!.setValue(option);
  this.selectedOption = option;
}

}


