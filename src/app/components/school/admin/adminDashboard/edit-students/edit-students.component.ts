import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudent } from 'src/app/Models/student';
import { classSubjects } from 'src/app/Models/subject';
import { validateBytrimming } from 'src/app/helpers/validations';
import { classValidators, emailValidators, mobileValidators, nameValidators } from 'src/app/shared/validators';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { Res } from 'src/app/Models/common';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css']
})
export class EditStudentsComponent implements OnInit {
  selectedOption!:string
  classNsubjects!: classSubjects[];
  isSubmitted=false;
  student!:IStudent
  classNumber!:string
  studentId!:string
  editStudentForm!:FormGroup
  initialFormValues!:Partial<IStudent>
  tenantId!:string
  isUpdating =false
constructor(
  private readonly adminService:SchoolAdminService,
  private readonly formBuilder:FormBuilder,
  public dialogRef:MatDialogRef<EditStudentsComponent>,
  @Inject(MAT_DIALOG_DATA) public data:{student:IStudent,tenantId:string,classNsub:classSubjects[]}
){
  this.student= this.data.student
  this.tenantId = this.data.tenantId
  this.studentId = this.data.student._id
  this.classNsubjects = this.data.classNsub  

  this.editStudentForm = this.formBuilder.group({
    email:[this.student.email,Validators.required],
    name:[this.student.name,Validators.required],
    mobile:[this.student.mobile,Validators.required],
    gaurdianName:[this.student.gaurdianName,Validators.required],
    classNum:[this.student.classNum,Validators.required]
  })

}
  ngOnInit(): void {
    this.initialFormValues = {...this.student}
    Object.keys(this.editStudentForm.controls).forEach(key =>{
      this.editStudentForm.get(key)?.valueChanges.subscribe(()=>{
        this.updateValidators()
      })
    })

  }



updateValidators(){
  if(this.isUpdating) return
  this.isUpdating = true
  const changedValues = this.getChangedValues()
  Object.keys(changedValues).forEach(key =>{
    const control = this.editStudentForm.get(key)
    if(control){
      control.clearValidators()
      if(key ==='name' && changedValues[key]){
        control.setValidators([validateBytrimming(nameValidators)])
      }
      if(key ==='email' && changedValues[key]){
        control.setValidators([validateBytrimming(emailValidators)])
      }
      if(key ==='gaurdianName' && changedValues[key]){
        control.setValidators([validateBytrimming(nameValidators)])
      }
      if(key ==='classNum' && changedValues[key]){
        control.setValidators([validateBytrimming(classValidators)])
      }
      if(key === 'mobile' && changedValues[key]){
        control.setValidators(validateBytrimming(mobileValidators))
      }
      // Update the control's value and validity to apply the changes
      control.updateValueAndValidity()
    }
    this.isUpdating = false
  })
}

getChangedValues():Partial<IStudent>{
  const changedValues:Partial<IStudent> ={}
  if(this.editStudentForm && this.initialFormValues){
    Object.keys(this.editStudentForm.value).forEach(key => {
      if (this.editStudentForm.value[key] !== this.initialFormValues[key as keyof IStudent]) {
        changedValues[key as keyof IStudent] = this.editStudentForm.value[key];
      }
    });
  }
  return changedValues
}

updateSelectedOption(option:string){

}

onSubmit(){
  const changes = this.getChangedValues()
  this.adminService.updateStudent(this.tenantId,this.studentId,changes).subscribe({
    next:(res:Res)=>{
      
    }
  })
  
}
onClose(){
  this.dialogRef.close()
}

}
