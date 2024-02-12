import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolhomeComponent } from './schoolhome/schoolhome.component';

const routes: Routes = [
  {path:'',component:SchoolhomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
