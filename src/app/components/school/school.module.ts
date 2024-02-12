import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolhomeComponent } from './schoolhome/schoolhome.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SchoolhomeComponent

  ],
  imports: [
    FormsModule,
    CommonModule,
    SchoolRoutingModule
  ]
})
export class SchoolModule { }
