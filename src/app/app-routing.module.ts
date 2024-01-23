import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantSignUpComponent } from './components/tenants/pages/tenant-sign-up/tenant-sign-up.component';
import { HomeComponent } from './components/tenants/pages/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'tenant/signup',component:TenantSignUpComponent},
  // {
  //   path: '',
  //   redirectTo: 'user',
  //   pathMatch: 'full'
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
