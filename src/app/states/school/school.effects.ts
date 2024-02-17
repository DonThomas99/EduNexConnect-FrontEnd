// import { SchoolAdminService} from 'src/app/components/school/services/school-admin.service'
// import { Injectable } from '@angular/core'
// import { Actions,createEffect,ofType } from '@ngrx/effects'
// import { fetchTenantData,saveTenantOnStore } from './school.actions'
// import { map,switchMap } from 'rxjs'


// @Injectable()
// export class TenantEffects{
//     constructor(
//         private readonly actions$:Actions,
//         private readonly schoolService : SchoolAdminService
//     ){}

//     fetchTenantData$ = createEffect(()=>{
//         return this.actions$.pipe(
//             ofType(fetchTenantData),
//             switchMap((action:{tenantId:string})=>{
//                 console.log(action,'action from tenant effects fetch tenant data');
//                 return this.schoolService.getTenantDetails(action.tenantId).pipe(
//                     map(tenantRes =>saveTenantOnStore({tenantId:tenantRes.data}))

//                 )
                
//             })
//         )
//     })
// }