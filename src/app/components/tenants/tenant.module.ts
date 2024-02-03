import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantSignUpComponent } from './pages/tenant-sign-up/tenant-sign-up.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { NameValidationComponent } from "./../common/name-validation/name-validation.component";
import { MobileValidationComponent } from "./../common/mobile-validation/mobile-validation.component";
import { EmailValidationComponent } from "./../common/email-validation/email-validation.component";
import { AddressValidationComponent } from "./../common/address-validation/address-validation.component";
import { CityValidationComponent } from "./../common/city-validation/city-validation.component";
import { StateValidationComponent } from "./../common/state-validation/state-validation.component";
import { PasswordValidationComponent } from "./../common/password-validation/password-validation.component";
import { ZipValidationComponent } from "./../common/zip-validation/zip-validation.component";
import { ConfirmPasswordValidationComponent } from "./../common/confirm-password-validation/confirm-password-validation.component";
import { TenantLogInComponent } from './pages/tenant-log-in/tenant-log-in.component';
import { TenantEnterEmailComponent } from './pages/tenant-enter-email/tenant-enter-email.component';
import { OtpValidationComponent } from "./../common/otp-validation/otp-validation.component";
import { TenantEditProfileComponent } from './dashboard/tenant-edit-profile/tenant-edit-profile.component';
import { TenantDashboardComponent } from './dashboard/tenant-dashboard/tenant-dashboard.component';
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardNavbarComponent } from './dashboard/dashboard-navbar/dashboard-navbar.component';
import { TopWidgetsComponent } from './dashboard/top-widgets/top-widgets.component';
import { MainComponent } from './dashboard/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionsComponent } from './dashboard/transactions/transactions.component';
import { ExistingPlansComponent } from './dashboard/existing-plans/existing-plans.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule } from '@angular/material/card';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component'





@NgModule({
    declarations: [
        TenantSignUpComponent,
        SidebarComponent,
        HomeComponent,
        HeaderComponent,
        TenantLogInComponent,
        TenantEnterEmailComponent,   
         TenantEditProfileComponent,
         TenantDashboardComponent,
         DashboardSidebarComponent,
         DashboardNavbarComponent,
          TopWidgetsComponent,
          MainComponent, 
          TransactionsComponent,
          ExistingPlansComponent,
          ChangePasswordComponent,


    ],
    imports: [
        MatCardModule,
    MatSlideToggleModule,
        CommonModule,
        TenantRoutingModule,
        HttpClientModule,
        // FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([]),
        NameValidationComponent,
        MobileValidationComponent,
        EmailValidationComponent,
        AddressValidationComponent,
        CityValidationComponent,
        StateValidationComponent,
        PasswordValidationComponent,
        ZipValidationComponent,
        ConfirmPasswordValidationComponent,
        OtpValidationComponent,
        FontAwesomeModule
    ]
})
export class TenantModule { }
