import { createReducer,on } from "@ngrx/store";
import { type ITenantRes } from "src/app/Models/tenants";
import { deleteTenantFromStore,saveTenantIdOnStore } from "./school.actions";

export interface IdState{
    tenantId: string|null;
    
}

export const initialTenantState: IdState = {
    tenantId: null,
    
}

export const IdReducer = createReducer(
    initialTenantState,
    on(saveTenantIdOnStore,(state,{tenantId})=>{
        console.log(tenantId,'tenatnId');
        
        return {...state,tenantId}
    }),
    on(deleteTenantFromStore,(state)=>{
        return {...state,tenantId:null}
    })
)