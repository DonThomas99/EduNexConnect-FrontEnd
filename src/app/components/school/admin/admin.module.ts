import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SideNavComponent } from './adminDashboard/side-nav/side-nav.component';
import { HeaderComponent } from './adminDashboard/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './adminDashboard/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { TeachersComponent } from './adminDashboard/teachers/teachers.component';
import { SubjectsComponent } from './adminDashboard/subjects/subjects.component';
import { ClassComponent } from './adminDashboard/class/class.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StudentsComponent } from './adminDashboard/students/students.component';
import { EmailValidationComponent } from '../../common/email-validation/email-validation.component';
import { NameValidationComponent } from '../../common/name-validation/name-validation.component';
import { MobileValidationComponent } from '../../common/mobile-validation/mobile-validation.component';
import { ToastrModule } from 'ngx-toastr';
import { ViewSubjectsComponent } from './adminDashboard/view-subjects/view-subjects.component';
import { EditTeacherComponent } from './adminDashboard/edit-teacher/edit-teacher.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { EditStudentsComponent } from './adminDashboard/edit-students/edit-students.component';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select' 
// @import '~@angular/material/prebuilt-themes/indigo-pink.css';





@NgModule({
  declarations: [
    AdminLoginComponent,
    SideNavComponent,
    HeaderComponent,
    DashboardComponent,
    TeachersComponent,
    SubjectsComponent,
    ClassComponent,
    StudentsComponent,
    ViewSubjectsComponent,
    EditTeacherComponent,
    EditStudentsComponent,
   
  ],
  imports: [
    // MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([]),
    AdminRoutingModule,
    EmailValidationComponent,
    NameValidationComponent,
    MobileValidationComponent
  ]
})
export class AdminModule { }
