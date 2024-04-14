import {createAction, props } from '@ngrx/store';
import { IteacherData } from 'src/app/Models/teacher';
import { IStudent } from 'src/app/Models/student';
import { IMatAsmnt } from 'src/app/Models/material';

export const saveTenantIdOnStore = createAction('[Tenant] Save Tenant Data On Store',props<{tenantId:string}>())
export const deleteTenantFromStore = createAction('[Tenant] Delete Tenant Data From Store')
export const setTeacherEmail = createAction('[Teacher] Set Email',props<{teacherEmail:string}>())
export const deleteTeacherEmail = createAction('[Teacher] Delete Email')
export const SaveTeacherData = createAction('[TeacherData] Save Teacher Data on Store',props<{teacherData:IteacherData}>())
export const deleteTeacherData = createAction('[TeacherData] Delete Teacher Data From Store')
export const setStudentEmail = createAction('[Student] Set Email',props<{studentEmail:string}>())
export const deleteStudentEmail = createAction('[Student] Delete Student Email')
export const saveStudentData = createAction('[StudentData Save Student Data on Store',props<{studentData:IStudent}>())
export const deleteStudentData = createAction('[StudentData] Delete Student Data From Store')
export const saveSubjectId = createAction('[SubjectId] Save subjectId on Store',props<{subjectId:string}>())
export const deleteSubjectId = createAction('[SubjectId] delete subjectId from Store')
export const saveClassNum = createAction('[classNum] Set classNum on Store',props<{classNum:string}>())
export const deleteClassNum = createAction('[classNum] delete classNum from Store')
export const saveAsnmt = createAction('[Asnmt] Save Assignment details on Store',props<{upload:IMatAsmnt}>())
export const deleteAsnmt = createAction('[Asnmt] delete Assignment details on Store')