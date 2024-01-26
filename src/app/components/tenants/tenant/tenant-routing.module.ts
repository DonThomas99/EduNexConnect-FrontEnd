import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantSignUpComponent } from '../pages/tenant-sign-up/tenant-sign-up.component';
import { HomeComponent } from '../pages/home/home.component';
import { TenantLogInComponent } from '../pages/tenant-log-in/tenant-log-in.component';


const routes: Routes = [
  {path:'signup',component:TenantSignUpComponent},
  {
    path: '',
    component: HomeComponent
  },
  {path:'signin',component:TenantLogInComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
