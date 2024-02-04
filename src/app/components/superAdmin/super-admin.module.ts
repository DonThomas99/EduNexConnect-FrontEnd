import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminUserListComponent } from './admin-tenant-list/admin-tenant-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule } from '@angular/material/tooltip'





@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminUserListComponent,


    ],
  imports: [
    MatTooltipModule,
    CommonModule,
    SuperAdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class SuperAdminModule { }
