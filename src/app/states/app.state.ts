import * as fromTenant from './tenant/tenant.reducer'
import * as fromId from './school/school.reducer'
import * as fromTeacherEmail from './school/school.reducer'
import * as fromTeacherData from './school/school.reducer'

export interface RootState{
    tenant: fromTenant.TenantState
}

export const reducers={
    Tenant:fromTenant.tenantReducer,
    TenantId:fromId.IdReducer,
    Teacher:fromTeacherEmail.teacherReducer,
    TeacherData:fromTeacherData.teacherDataReducer
}