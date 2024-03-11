import {createAction, props } from '@ngrx/store';
import { IteacherData } from 'src/app/Models/teacher';
import { IStudent } from 'src/app/Models/student';

export const saveTenantIdOnStore = createAction('[Tenant] Save Tenant Data On Store',props<{tenantId:string}>())
export const deleteTenantFromStore = createAction('[Tenant] Delete Tenant Data From Store')
export const setTeacherEmail = createAction('[Teacher] Set Email',props<{teacherEmail:string}>())
export const SaveTeacherData = createAction('[TeacherData] Save Teacher Data on Store',props<{teacherData:IteacherData}>())
export const deleteTeacherData = createAction('[TeacherData] Delete Teacher Data From Store')
export const setStudentEmail = createAction('[Student] Set Email',props<{studentEmail:string}>())
export const saveStudentData = createAction('[StudentData Save Student Data on Store',props<{studentData:IStudent}>())
export const deleteStudentData = createAction('[StudentData] Delete Student Data From Store')
export const saveSubjectId = createAction('[SubjectId] Save subjectId on Store',props<{subjectId:string}>())
