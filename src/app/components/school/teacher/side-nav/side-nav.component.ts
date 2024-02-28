import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IteacherData } from 'src/app/Models/teacher';
import { selectTeacherData } from 'src/app/states/school/school.selector';
import {Sidenav,initTE} from 'tw-elements';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  teacherData!:IteacherData
  open = false
  toggleOpen(){
    this.open = !this.open
  }
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
