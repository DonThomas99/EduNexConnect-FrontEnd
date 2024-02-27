import {createAction, props } from '@ngrx/store';
export const saveTenantIdOnStore = createAction('[Tenant] Save Tenant Data On Store',props<{tenantId:string}>())
export const deleteTenantFromStore = createAction('[Tenant] Delete Tenant Data From Store')
export const setTeacherEmail = createAction('[Teacher] Set Email',props<{teacherEmail:string}>())