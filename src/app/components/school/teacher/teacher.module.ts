import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TeacherLandingPageComponent } from './teacher-landing-page/teacher-landing-page.component';
import { TeacherClassworkComponent } from './teacher-classwork/teacher-classwork.component';
import { TeacherPeopleComponent } from './teacher-people/teacher-people.component';
import { TeacherGradesComponent } from './teacher-grades/teacher-grades.component';
import { MatCardModule } from '@angular/material/card';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    TeacherLoginComponent,
    TeacherDashboardComponent,
    SideNavComponent,
    TopNavComponent,
    TeacherLandingPageComponent,
    TeacherClassworkComponent,
    TeacherPeopleComponent,
    TeacherGradesComponent
  ],
  imports: [
    QuillModule.forRoot(),
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
