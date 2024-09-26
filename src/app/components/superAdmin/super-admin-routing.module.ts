import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserListComponent } from './admin-tenant-list/admin-tenant-list.component';
import { TenantDetailsComponent } from './tenant-details/tenant-details.component';
import { SubscriptionPlansComponent } from './subscription-plans/subscription-plans.component';
import { BannerComponent } from './banner/banner.component';

const routes: Routes = [
  {path:'',component:AdminLoginComponent},
  {path:'dashboard',component:AdminDashboardComponent},
  {path:'tenantList',component:AdminUserListComponent},
  {path:'tenantDetails',component:TenantDetailsComponent},
  {path:'plans',component:SubscriptionPlansComponent},
  {path:'banner',component:BannerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
