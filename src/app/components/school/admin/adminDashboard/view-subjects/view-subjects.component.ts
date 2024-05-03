import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { classSubjects, subj } from 'src/app/Models/subject';
import { SchoolAdminService } from '../../../services/school-admin.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Res } from 'src/app/Models/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view-subjects',
  templateUrl: './view-subjects.component.html',
  styleUrls: ['./view-subjects.component.css']
})
export class ViewSubjectsComponent {
  selectedClass: string = '';
  selectedSubject: string = '';
  classSubject!:classSubjects
  tenantId!:string
  subjectName!:string
  editSubjectForm!:FormGroup
  subjectId!:string
  classNum!:string
constructor(
  private readonly schoolAdminService:SchoolAdminService,
  private readonly toastr:ToastrService,
  public dialogRef:MatDialogRef<ViewSubjectsComponent>,
  @Inject(MAT_DIALOG_DATA) public data:{subject:classSubjects, classNumber:string, tenantId:string}
){
this.classSubject= this.data.subject
this.classNum = this.data.classNumber
this.tenantId = this.data.tenantId
this.editSubjectForm = new FormGroup({
  subjectName: new FormControl('', Validators.required)
});
}



openConfirmationModal(classNumber: string, subject: string): void {
  // Set the selected class and subject
  this.selectedClass = classNumber;
  this.selectedSubject = subject;
  // Show the confirmation modal
  const modal = document.getElementById('confirmation_modal') as HTMLDialogElement;
  modal.showModal();
}

closeConfirmationModal(){
  this.selectedClass = '';
  this.selectedSubject = '';
  const modal = document.getElementById('confirmation_modal') as HTMLDialogElement;
  modal.close();
}
deleteSubject(){
  this.schoolAdminService.deleteSubject(this.tenantId,this.selectedClass,this.selectedSubject).subscribe({
    next:(res)=>{
      this.closeConfirmationModal()
      void Swal.fire({
        icon: 'success',
        title: res,
      }).then(() => {
        window.location.reload();
      });


    }
  })
}
onClose()
{
  this.dialogRef.close()
}
editSubject(subject:subj){
  this.subjectName = subject.name
  this.subjectId = subject._id
  const modal = document.getElementById('editSubjectModal') as HTMLDialogElement;
  modal.showModal()
}

onSubmit(){
if(this.editSubjectForm.valid){
  const subjectName =this.editSubjectForm.getRawValue()
 
  
this.schoolAdminService.editSubject(this.tenantId,this.classNum,subjectName,this.subjectId).subscribe({
    next:(res:Res)=>{
      const message = res.message 
      this.toastr.success(message) 
    },error:(res:Res)=>{
      const message = res.message
      this.toastr.error(message)
    }  
})
}
}


}
