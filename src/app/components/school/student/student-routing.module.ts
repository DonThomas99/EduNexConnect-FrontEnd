import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentDashboardComponent } from './studentDashboard/student-dashboard/student-dashboard.component';
import { StudentSubjectDetailPageComponent } from './studentDashboard/student-subject-detail-page/student-subject-detail-page.component';
import { StudentClassworkComponent } from './studentDashboard/student-classwork/student-classwork.component';
import { StudentPeopleComponent } from './studentDashboard/student-people/student-people.component';
import { StudentAssignmentDetailComponent } from './studentDashboard/student-assignment-detail/student-assignment-detail.component';

const routes: Routes = [
  {path:'',component:StudentLoginComponent},
  {path:'dashboard',component:StudentDashboardComponent},
  {path:'stream',component:StudentSubjectDetailPageComponent},
  {path:'classwork',component:StudentClassworkComponent},
  {path:'people',component:StudentPeopleComponent},
  {path:'assignment-view',component:StudentAssignmentDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
