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

  toggleCreateButton(){
    this.viewCreate = !this.viewCreate
  }
}
