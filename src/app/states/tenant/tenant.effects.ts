import { TenantService} from 'src/app/services/tenant.service'
import { Injectable } from '@angular/core'
import { Actions,createEffect,ofType } from '@ngrx/effects'
import { fetchTenantData,saveTenantOnStore } from './tenant.actions'
import { map,switchMap } from 'rxjs'


@Injectable()
export class TenantEffects{
    constructor(
        private readonly actions$:Actions,
        private readonly tenantService: TenantService
    ){}

    fetchTenantData$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fetchTenantData),
            switchMap((action:{tenantId:string})=>{
                console.log(action,'action from tenant effects fetch tenant data');
                return this.tenantService.getTenantDetails(action.tenantId).pipe(
                    map(tenantRes =>saveTenantOnStore({tenantDetails:tenantRes.data}))

                )
                
            })
        )
    })
}