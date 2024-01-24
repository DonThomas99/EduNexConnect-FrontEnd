import { createFeatureSelector,createSelector } from "@ngrx/store"
import {type TenantState} from './tenant.reducer'

export const selectTenantState = createFeatureSelector<TenantState>('Tenant')
export const selectTenantDetails = createSelector(
    selectTenantState,
    (state:TenantState)=>state.tenantDetails
)
