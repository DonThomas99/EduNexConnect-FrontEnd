import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolhomeComponent } from './schoolhome/schoolhome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environments } from 'src/environments/environment';

// import { StoreModule } from '@ngrx/store';


const config:SocketIoConfig = {url:`${environments.backendURL}`}


@NgModule({
  declarations: [
    SchoolhomeComponent,

  ],
  imports: [
    SocketIoModule.forRoot(config),

    ToastrModule.forRoot(),
    // BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    SchoolRoutingModule,
    ReactiveFormsModule,
    // StoreModule
  ]
})
export class SchoolModule { }
