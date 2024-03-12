import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-teacher-classwork',
  templateUrl: './teacher-classwork.component.html',
  styleUrls: ['./teacher-classwork.component.css']
})
export class TeacherClassworkComponent implements OnInit {
viewCreate=false
  ngOnInit(): void {

  }

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

  toggleCreateButton(){
    this.viewCreate = !this.viewCreate
  }
}
