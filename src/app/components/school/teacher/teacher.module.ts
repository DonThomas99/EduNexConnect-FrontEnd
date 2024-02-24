import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TeacherLoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
