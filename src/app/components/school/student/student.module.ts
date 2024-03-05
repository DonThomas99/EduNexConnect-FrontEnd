import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentLoginComponent } from './student-login/student-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentSideNavComponent } from './studentDashboard/student-side-nav/student-side-nav.component';
import { StudentDashboardComponent } from './studentDashboard/student-dashboard/student-dashboard.component';


@NgModule({
  declarations: [
    StudentLoginComponent,
    StudentSideNavComponent,
    StudentDashboardComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
