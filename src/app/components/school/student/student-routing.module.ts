import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentDashboardComponent } from './studentDashboard/student-dashboard/student-dashboard.component';

const routes: Routes = [
  {path:'',component:StudentLoginComponent},
  {path:'dashboard',component:StudentDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
