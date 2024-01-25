import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:'tenant',loadChildren:()=> import('./components/tenants/tenant/tenant.module').then(m =>m.TenantModule)},
  {path:'superAdmin',loadChildren:() => import('./components/superAdmin/super-admin/super-admin.module').then(m=>m.SuperAdminModule)},
  {
    path: '',
    redirectTo: 'tenant',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
