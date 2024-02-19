import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardComponent } from './adminDashboard/dashboard/dashboard.component';
import { TeachersComponent } from './adminDashboard/teachers/teachers.component';
import { SubjectsComponent } from './adminDashboard/subjects/subjects.component';

const routes: Routes = [
  {path:'',component:AdminLoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'dashboard/teachers',component:TeachersComponent},
  {path:'dashboard/subjects',component:SubjectsComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
