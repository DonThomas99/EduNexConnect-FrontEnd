import * as fromTenant from './tenant/tenant.reducer'
import * as fromId from './school/school.reducer'
import * as fromSchool from './school/school.reducer'

export interface RootState{
    tenant: fromTenant.TenantState
}

export const reducers={
    Tenant:fromTenant.tenantReducer,
    TenantId:fromId.IdReducer,
    Teacher:fromSchool.teacherReducer,
    TeacherData:fromSchool.teacherDataReducer,
    Student:fromSchool.studentReducer,
    StudentData:fromSchool.studentDataReducer,
    SubjectId:fromSchool.subjectIdReducer,
    ClassNum:fromSchool.classNumReducer
}
