import { createFeatureSelector,createSelector } from "@ngrx/store"
import {TeacherState, type IdState, TeacherDataState} from './school.reducer'

export const selectTenantState = createFeatureSelector<IdState>('TenantId')
export const selectTenantId = createSelector(
    selectTenantState,
    (state:IdState)=>{
        console.log(state,'state');
        
      return  state.tenantId
    }
)

export const selectTeacherState = createFeatureSelector<TeacherState>('Teacher')
export const selectTeacherEmail = createSelector(
  selectTeacherState,
  (state:TeacherState)=>{
    console.log(state,'state form ');
    
    return state.email
  } 
);

export const selectTeacherDataState = createFeatureSelector<TeacherDataState>('TeacherData')
export const selectTeacherData = createSelector(
  selectTeacherDataState,
  (state:TeacherDataState)=>{
    console.log(state,'data state');
    return state
    
  }
)