import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherLandingPageComponent } from './teacher-landing-page/teacher-landing-page.component';
import { TeacherClassworkComponent } from './teacher-classwork/teacher-classwork.component';
import { TeacherPeopleComponent } from './teacher-people/teacher-people.component';
import { TeacherGradesComponent } from './teacher-grades/teacher-grades.component';
// import { VideoClassComponent } from '../../common/video-class/video-class.component';
import { AssignmentValuationComponent } from './assignment-valuation/assignment-valuation.component';


const routes: Routes = [
  {path:'',component:TeacherLoginComponent},
  {path:'dashboard',component:TeacherDashboardComponent},
  {path:'stream',component:TeacherLandingPageComponent},
  {path:'classwork',component:TeacherClassworkComponent},
  {path:'people',component:TeacherPeopleComponent},
  {path:'grades',component:TeacherGradesComponent},
 
  {path:'valuation/:assignmentId',component:AssignmentValuationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
