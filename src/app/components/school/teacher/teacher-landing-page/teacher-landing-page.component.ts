import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';

@Component({
  selector: 'app-teacher-landing-page',
  templateUrl: './teacher-landing-page.component.html',
  styleUrls: ['./teacher-landing-page.component.css']
})
export class TeacherLandingPageComponent implements OnInit {
  tenantId!:string
  tenantId$= this.store.select(pipe(selectTenantId))
  constructor(
    private store:Store
  ){
    
  }

  ngOnInit(): void {
    
  }

}
