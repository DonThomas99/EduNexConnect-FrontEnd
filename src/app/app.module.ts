import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/tenants/pages/home/home.component';
import { HeaderComponent } from './components/tenants/header/header.component';
import { SidebarComponent } from './components/tenants/sidebar/sidebar.component';
import { TenantSignUpComponent } from './components/tenants/pages/tenant-sign-up/tenant-sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { reducers } from './states/app.state';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    TenantSignUpComponent,
 
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgModule,
    HttpClientModule,
    // FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({reducers}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
