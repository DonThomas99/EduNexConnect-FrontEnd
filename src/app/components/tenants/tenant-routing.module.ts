import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantSignUpComponent } from './pages/tenant-sign-up/tenant-sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { TenantLogInComponent } from './pages/tenant-log-in/tenant-log-in.component';
import { TenantEnterEmailComponent } from './pages/tenant-enter-email/tenant-enter-email.component';
import { TenantDashboardComponent } from './dashboard/tenant-dashboard/tenant-dashboard.component';
import { TransactionsComponent } from './dashboard/transactions/transactions.component';
import { ExistingPlansComponent } from './dashboard/existing-plans/existing-plans.component';
import { TenantEditProfileComponent } from './dashboard/tenant-edit-profile/tenant-edit-profile.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';
import { ManageAdminComponent } from './dashboard/manage-admin/manage-admin.component';
import { CreateAdminComponent } from './dashboard/create-admin/create-admin.component';



const routes: Routes = [

  {path:'signup',component:TenantSignUpComponent},
  {
    path: '',
    component: HomeComponent
  },
  {path:'signin',component:TenantLogInComponent},
  {path:'enter-email',component:TenantEnterEmailComponent},
  {path:'dashboard',component:TenantDashboardComponent},
  {path:'transactions',component:TransactionsComponent},
  {path:'existingPlans',component:ExistingPlansComponent},
  {path:'editProfile',component:TenantEditProfileComponent},
  {path:'changePassword',component:ChangePasswordComponent},
  {path:'manageAdmins',component:ManageAdminComponent},
  {path:'createAdmin',component:CreateAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
