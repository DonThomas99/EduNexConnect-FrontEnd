import { createReducer,on } from "@ngrx/store";
import { type ITenantRes } from "src/app/Models/tenants";
import { deleteTenantFromStore,saveTenantIdOnStore, setTeacherEmail } from "./school.actions";

export interface IdState{
    tenantId: string|null;
}

export interface TeacherState{
    email:string|null
}

export const initialTeacherState:TeacherState ={
    email:null,
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

export const teacherReducer = createReducer(
    initialTeacherState,
    on(setTeacherEmail,(state,{teacherEmail})=>{
        console.log(teacherEmail,'teacherEmail');
        
        return {...state,email:teacherEmail}
    })
)