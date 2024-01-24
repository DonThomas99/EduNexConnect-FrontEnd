import { createReducer,on } from "@ngrx/store";
import { type ITenantRes } from "src/app/Models/tenants";
import { deleteTenantFromStore,saveTenantOnStore } from "./tenant.actions";

export interface TenantState{
    tenantDetails: any;
    userDetails:ITenantRes|null
}

export const initialTenantState: TenantState = {
    tenantDetails: null,
    userDetails: null
}

export const tenantReducer = createReducer(
    initialTenantState,
    on(saveTenantOnStore,(state,{tenantDetails})=>{
        return {...state,tenantDetails}
    }),
    on(deleteTenantFromStore,(state)=>{
        return {...state,tenantDetails:null}
    })
)