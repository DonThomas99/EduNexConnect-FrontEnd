import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { reducers } from './states/app.state';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { hydrationMetaReducer } from './states/hydration.reducer';
import {MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TenantVerifyOtpComponent } from './components/common/tenant-verify-otp/tenant-verify-otp.component';
import { ForgotPasswordComponent } from './components/tenants/reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTooltipModule} from '@angular/material/tooltip'
import { TenantInterceptorInterceptor } from './interceptors/tenant-interceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ClassNumValidationComponent } from './components/common/class-num-validation/class-num-validation.component';
import { ConfirmationDialogComponent } from './components/common/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditMaterialsComponent } from './components/common/edit-materials/edit-materials.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadComponent } from './components/common/file-upload/file-upload.component';
// import { QuillModule } from 'ngx-quill';



export const metaReducers: MetaReducer[] = [hydrationMetaReducer]

@NgModule({
  declarations: [
    AppComponent,
    TenantVerifyOtpComponent,
    ForgotPasswordComponent,
    ClassNumValidationComponent,
    ConfirmationDialogComponent,
    EditMaterialsComponent,
    FileUploadComponent,
    
    
        
  ],
  imports: [
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    QuillModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    MatTooltipModule,
    MatSlideToggleModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TenantInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
