import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { classSubjects } from 'src/app/Models/subject';
import { SchoolAdminService } from '../../../services/school-admin.service';
import Swal from 'sweetalert2';

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
constructor(
  private readonly schoolAdminService:SchoolAdminService,
  public dialogRef:MatDialogRef<ViewSubjectsComponent>,
  @Inject(MAT_DIALOG_DATA) public data:{subject:classSubjects, classNumber:string, tenantId:string}
){
this.classSubject= this.data.subject
this.tenantId = this.data.tenantId

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
}
