import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IteacherData } from 'src/app/Models/teacher';
import { selectClassNum, selectSubjectId, selectTeacherData, selectTenantId } from 'src/app/states/school/school.selector';
import Swal from 'sweetalert2';
import {Sidenav,initTE} from 'tw-elements';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { pipe } from 'rxjs';
import { Res } from 'src/app/Models/common';

import { saveClassNum, saveSubjectId, saveTenantIdOnStore } from 'src/app/states/school/school.actions';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  teacherData!:IteacherData
  roomId!:string 
  errorId!:boolean
  tenantId!:string
  subjectId!:string
  classNum!:string
  tenantId$ = this.store.select(pipe(selectTenantId))
  subjectId$ = this.store.select(pipe(selectSubjectId))
  classNum$ = this.store.select(pipe(selectClassNum))
  constructor(
    private store:Store,
    private readonly router:Router,
    private readonly route:ActivatedRoute,
    private readonly teacherService:TeacherServiceService,
    
  ) { }

  ngOnInit(): void {
    this.errorId =false
    this.store.select(selectTeacherData).subscribe(data=>{
      if(data){
        this.teacherData = data
      }
        })

        this.classNum$.subscribe((num)=>{
          this.classNum = num.classNum as unknown as string
        })

        this.tenantId$.subscribe((id)=>{    
          if(id)
            this.tenantId = id
          })
          this.subjectId$.subscribe((id)=>{
            if(id)
            this.subjectId = id.subjectId as unknown as string
          
          })
  }

}
