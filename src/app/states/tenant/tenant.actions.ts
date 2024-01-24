import {createAction, props } from '@ngrx/store'
import { type ITenantRes } from 'src/app/Models/tenants'

export const fetchTenantData = createAction('[Tenant] Fetch Tenant Data From Database', props<{tenantId:string}>())
export const saveTenantOnStore = createAction('[Tenant] Save Tenant Data On Store',props<{tenantDetails:ITenantRes}>())
export const deleteTenantFromStore = createAction('[Tenant] Delete Tenant Data From Store')