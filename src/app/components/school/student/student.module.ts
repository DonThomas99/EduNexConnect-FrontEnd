import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentLoginComponent } from './student-login/student-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentSideNavComponent } from './studentDashboard/student-side-nav/student-side-nav.component';
import { StudentDashboardComponent } from './studentDashboard/student-dashboard/student-dashboard.component';
import { StudentSubjectDetailPageComponent } from './studentDashboard/student-subject-detail-page/student-subject-detail-page.component';
import { NavComponent } from './studentDashboard/nav/nav.component';
import { StudentClassworkComponent } from './studentDashboard/student-classwork/student-classwork.component';
import { StudentPeopleComponent } from './studentDashboard/student-people/student-people.component';
import { StudentAssignmentDetailComponent } from './studentDashboard/student-assignment-detail/student-assignment-detail.component';
import { StudentMaterialDetailComponent } from './studentDashboard/student-material-detail/student-material-detail.component';
import {MatIconModule} from '@angular/material/icon'


@NgModule({
  providers:[DatePipe],
  declarations: [
    StudentLoginComponent,
    StudentSideNavComponent,
    StudentDashboardComponent,
    StudentSubjectDetailPageComponent,
    NavComponent,
    StudentClassworkComponent,
    StudentPeopleComponent,
    StudentAssignmentDetailComponent,
    StudentMaterialDetailComponent
  ],
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
