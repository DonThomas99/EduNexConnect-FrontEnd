import { createFeatureSelector,createSelector } from "@ngrx/store"
import {type IdState} from './school.reducer'

export const selectTenantState = createFeatureSelector<IdState>('TenantId')
export const selectTenantId = createSelector(
    selectTenantState,
    (state:IdState)=>{
        console.log(state,'state');
        
      return  state.tenantId
    }
)
