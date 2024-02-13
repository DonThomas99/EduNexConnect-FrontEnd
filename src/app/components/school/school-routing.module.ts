import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolhomeComponent } from './schoolhome/schoolhome.component';

const routes: Routes = [
  {path:'',component:SchoolhomeComponent},
  {path:'admin',loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'teacher',loadChildren:() => import('./teacher/teacher.module').then(m=>m.TeacherModule)},
  {path:'student',loadChildren:() => import('./student/student.module').then(m=>m.StudentModule)}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
