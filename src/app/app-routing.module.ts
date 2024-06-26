import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribedComponent } from './components/common/subscribed/subscribed.component';

const routes: Routes = [

  {path:'tenant',loadChildren:()=> import('./components/tenants/tenant.module').then(m =>m.TenantModule)},
  {path:'super-admin',loadChildren:() => import('./components/superAdmin/super-admin.module').then(m=>m.SuperAdminModule)},
  
  {
    path: '',
    redirectTo: 'tenant',
    pathMatch: 'full'
  },
  {
    path:'school',loadChildren:()=>import('./components/school/school.module').then(s=>s.SchoolModule)

  },
  {path:'subscribed',component:SubscribedComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
