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




@NgModule({
  declarations: [
    AdminLoginComponent,
    SideNavComponent,
    HeaderComponent,
    DashboardComponent,
    TeachersComponent,
    SubjectsComponent,
    ClassComponent

  ],
  imports: [
    FormsModule,

    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([]),
    AdminRoutingModule
  ]
})
export class AdminModule { }
