import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TeacherLandingPageComponent } from './teacher-landing-page/teacher-landing-page.component';
import { TeacherClassworkComponent } from './teacher-classwork/teacher-classwork.component';
import { TeacherPeopleComponent } from './teacher-people/teacher-people.component';
import { TeacherGradesComponent } from './teacher-grades/teacher-grades.component';
import { MatCardModule } from '@angular/material/card';
import { QuillModule } from 'ngx-quill';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import {CalendarModule} from 'primeng/calendar'
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { ZoomCallComponent } from './zoom-call/zoom-call.component';
import { AssignmentValuationComponent } from './assignment-valuation/assignment-valuation.component';
import { AssignmentViewComponent } from './assignment-view/assignment-view.component';
import { MaterialViewComponent } from './material-view/material-view.component';

// import { MatMomentDateModule } from '@angular/material-moment-adapter';



@NgModule({
  providers:[DatePipe],

  declarations: [
    TeacherLoginComponent,
    TeacherDashboardComponent,
    SideNavComponent,
    TopNavComponent,
    TeacherLandingPageComponent,
    TeacherClassworkComponent,
    TeacherPeopleComponent,
    TeacherGradesComponent,
    ZoomCallComponent,
    AssignmentValuationComponent,
    AssignmentViewComponent,
    MaterialViewComponent
  ],
  imports: [
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    // BrowserModule,
    MatIconModule,
    FormsModule,
    CalendarModule,
    // MatMomentDateModule,
    MatNativeDateModule,
  MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    QuillModule.forRoot(),
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
