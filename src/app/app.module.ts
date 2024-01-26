import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { reducers } from './states/app.state';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { hydrationMetaReducer } from './states/hydration.reducer';
import { AdminLoginComponent } from './components/superAdmin/admin-login/admin-login.component';
import { TenantVerifyOtpComponent } from './components/tenants/pages/tenant-verify-otp/tenant-verify-otp.component';
import { ForgotPasswordComponent } from './components/tenants/forgot-password/forgot-password.component';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer]

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    TenantVerifyOtpComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
