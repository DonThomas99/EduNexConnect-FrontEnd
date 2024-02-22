import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolhomeComponent } from './schoolhome/schoolhome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { StoreModule } from '@ngrx/store';




@NgModule({
  declarations: [
    SchoolhomeComponent,

  ],
  imports: [
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    SchoolRoutingModule,
    ReactiveFormsModule,
    // StoreModule
  ]
})
export class SchoolModule { }
