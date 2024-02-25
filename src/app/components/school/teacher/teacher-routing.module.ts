import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';


const routes: Routes = [
  {path:'',component:TeacherLoginComponent},
  {path:'dashboard',component:TeacherDashboardComponent},
  // {path:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
