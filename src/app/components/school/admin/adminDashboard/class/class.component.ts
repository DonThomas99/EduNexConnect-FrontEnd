import { Component, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IStudent } from 'src/app/Models/student';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { ConfirmationDialogComponent } from 'src/app/components/common/confirmation-dialog/confirmation-dialog.component';
import { Res } from 'src/app/Models/common';
import { ToastrService } from 'ngx-toastr';
import { EditStudentsComponent } from '../edit-students/edit-students.component';
import { classSubjects } from 'src/app/Models/subject';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {
  classNsubjects!: classSubjects[];
  filteredStudents!:IStudent[]
  classNumber!:string
  tenantId!:string
  constructor(
    private dialog:MatDialog,
    private toastr:ToastrService,
    private readonly adminService:SchoolAdminService,
    public dialogRef:MatDialogRef<ClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{material:IStudent[],classNumber:string,tenantId:string,classNsub:classSubjects[]}
  ){
    this.filteredStudents = this.data.material
    this.classNumber = this.data.classNumber
    this.tenantId = this.data.tenantId
    this.classNsubjects = this.data.classNsub
  }

  removeStudent(id:string,name:string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{message:`Are you sure you want to remove  ${name}  ?`}
    })
  dialogRef.afterClosed().subscribe(result =>{
    if(result){
      this.adminService.removeStudent(this.tenantId,id).subscribe({
        next:(res:Res)=>{
          const message = res.message
            this.toastr.success(message)
            this.dialogRef.close()
            window.location.reload()
        },
        error:(res:Res)=>{
          const message = res.message
          this.toastr.error(message)
        }
      })
    }
  })
  }

  

  editStudent(student:IStudent){
    
    this.dialogRef.close()
    const dialogRef = this.dialog.open(EditStudentsComponent,{
      data:{student:student,
        tenantId:this.tenantId,
        classNsub:this.data.classNsub
      },
      width:'100%',
      height:'70%'
    } )
  }
  
  onClose(){
    this.dialogRef.close()
  }
}
