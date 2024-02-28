import { createReducer,on } from "@ngrx/store";
import { type ITenantRes } from "src/app/Models/tenants";
import { SaveTeacherData, deleteTeacherData, deleteTenantFromStore,saveTenantIdOnStore, setTeacherEmail } from "./school.actions";

export interface IdState{
    tenantId: string|null;
}

export interface TeacherState{
    email:string|null
}

export interface TeacherDataState{
    email:string;
    name:string;
    password:string;
    classNsub:[{
      classNum:string;
      subject:string[];
    }]
}

export const initialTeacherDataState:TeacherDataState ={
        email:'',
        name:'',
        password:'',
        classNsub:[{
            classNum:'',
            subject:[]
        }],
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

export const teacherDataReducer = createReducer(
    initialTeacherDataState,
    on(SaveTeacherData,(state,{teacherData})=>{
        return { ...state, ...teacherData };
    }),on(deleteTeacherData,(state)=>{
        return {...state,teacherData:null}
    })
)