import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherLandingPageComponent } from './teacher-landing-page/teacher-landing-page.component';


const routes: Routes = [
  {path:'',component:TeacherLoginComponent},
  {path:'dashboard',component:TeacherDashboardComponent},
  {path:'subjectLanding',component:TeacherLandingPageComponent}
  // {path:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
