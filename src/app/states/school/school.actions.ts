import {createAction, props } from '@ngrx/store';
import { IteacherData } from 'src/app/Models/teacher';
export const saveTenantIdOnStore = createAction('[Tenant] Save Tenant Data On Store',props<{tenantId:string}>())
export const deleteTenantFromStore = createAction('[Tenant] Delete Tenant Data From Store')
export const setTeacherEmail = createAction('[Teacher] Set Email',props<{teacherEmail:string}>())
export const SaveTeacherData = createAction('[TeacherData] Save Teacher Data on Store',props<{teacherData:IteacherData}>())
export const deleteTeacherData = createAction('[TeacherData] Delete Teacher Data From Store')