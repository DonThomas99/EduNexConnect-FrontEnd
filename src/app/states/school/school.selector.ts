import { createFeatureSelector,createSelector } from "@ngrx/store"
import {TeacherState, type IdState} from './school.reducer'

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