import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SideNavComponent } from './adminDashboard/side-nav/side-nav.component';
import { HeaderComponent } from './adminDashboard/header/header.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    SideNavComponent,
    HeaderComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
