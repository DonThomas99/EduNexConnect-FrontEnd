import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IteacherData } from 'src/app/Models/teacher';
import { selectTeacherData } from 'src/app/states/school/school.selector';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  teacherData!:IteacherData
  constructor(
    private store:Store
  ) { }
  ngOnInit(): void {
    this.store.select(selectTeacherData).subscribe(data=>{
      if(data){
        this.teacherData = data
      }
        })
  }



}
