import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { reducers } from './states/app.state';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { hydrationMetaReducer } from './states/hydration.reducer';

import { TenantVerifyOtpComponent } from './components/common/tenant-verify-otp/tenant-verify-otp.component';
import { ForgotPasswordComponent } from './components/tenants/reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



export const metaReducers: MetaReducer[] = [hydrationMetaReducer]

@NgModule({
  declarations: [
    AppComponent,
    
    TenantVerifyOtpComponent,
    ForgotPasswordComponent,

   
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
