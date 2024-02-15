import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolhomeComponent } from './schoolhome/schoolhome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    SchoolhomeComponent,

  ],
  imports: [
    FormsModule,
    CommonModule,
    SchoolRoutingModule,
    ReactiveFormsModule
  ]
})
export class SchoolModule { }
