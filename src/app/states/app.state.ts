import * as fromTenant from './tenant/tenant.reducer'
import * as fromId from './school/school.reducer'

export interface RootState{
    tenant: fromTenant.TenantState
}

export const reducers={
    Tenant:fromTenant.tenantReducer,
    TenantId:fromId.IdReducer
    
}