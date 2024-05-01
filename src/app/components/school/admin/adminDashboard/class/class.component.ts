import { Component, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudent } from 'src/app/Models/student';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {

  filteredStudents!:IStudent[]
  classNumber!:string
  constructor(
    public dialogRef:MatDialogRef<ClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{material:IStudent[],classNumber:string}
  ){
    this.filteredStudents = this.data.material
    this.classNumber = this.data.classNumber
  }
  onClose(){
    this.dialogRef.close()
  }
}
