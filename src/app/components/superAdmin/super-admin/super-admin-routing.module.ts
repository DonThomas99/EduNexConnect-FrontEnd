import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path:'',component:AdminLoginComponent},
  {path:'admin-dashboard',component:AdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
