import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentDashboardComponent } from './studentDashboard/student-dashboard/student-dashboard.component';
import { StudentSubjectDetailPageComponent } from './studentDashboard/student-subject-detail-page/student-subject-detail-page.component';

const routes: Routes = [
  {path:'',component:StudentLoginComponent},
  {path:'dashboard',component:StudentDashboardComponent},
  {path:'subjectLanding',component:StudentSubjectDetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
