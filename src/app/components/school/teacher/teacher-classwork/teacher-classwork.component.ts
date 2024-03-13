import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Event } from '@angular/router';
import { validatePdf } from 'src/app/helpers/validations';
@Component({
  selector: 'app-teacher-classwork',
  templateUrl: './teacher-classwork.component.html',
  styleUrls: ['./teacher-classwork.component.css']
})
export class TeacherClassworkComponent implements OnInit {
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
constructor(){

}
  ngOnInit(): void {
this.materialForm = new FormGroup({
  'materialTitle' : new FormControl('',Validators.required),
  'content': new FormControl('',Validators.required),
  'pdf': new FormControl('',[Validators.required,validatePdf])  
})
// this.editorForm = new FormGroup({
//   'editorContent':new FormControl(null, Validators.required)
// })
  }

  toggleCreateButton(){
    this.viewCreate = !this.viewCreate
  }
  uploadMaterial(){
  
    console.log('ehee');
    
    // console.log(this.materialForm.getRawValue());
    
if(this.materialForm.valid){
  console.log('usghebw');
  
  console.log(this.materialForm.getRawValue());
  
}
  }

  onSelectedPdf(){
// this.selectedImage = event.target.files[0]
  }

}
