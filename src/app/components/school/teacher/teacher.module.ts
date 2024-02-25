import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';


@NgModule({
  declarations: [
    TeacherLoginComponent,
    TeacherDashboardComponent,
    SideNavComponent,
    TopNavComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
