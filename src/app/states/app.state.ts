import * as fromTenant from './tenant/tenant.reducer'

export interface RootState{
    tenant: fromTenant.TenantState
}

export const reducers={
    tenant:fromTenant.tenantReducer,
    
}