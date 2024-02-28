import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IteacherData } from 'src/app/Models/teacher';
import { selectTeacherData } from 'src/app/states/school/school.selector';
import {Sidenav,initTE} from 'tw-elements'


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  // renderer: any;
  teacherData!:IteacherData
  constructor(
    private store:Store
  ) {
    // initTE({ Sidenav }); // Initialize TW Elements
}
  ngOnInit(): void {
    this.store.select(selectTeacherData).subscribe(data=>{
      if(data){
        this.teacherData = data
      }
        })
  }



}
