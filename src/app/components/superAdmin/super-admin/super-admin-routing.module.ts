import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AdminUserListComponent } from '../admin-tenant-list/admin-tenant-list.component';

const routes: Routes = [
  {path:'',component:AdminLoginComponent},
  {path:'dashboard',component:AdminDashboardComponent},
  {path:'tenantList',component:AdminUserListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
