import { createReducer,on } from "@ngrx/store";
import { type ITenantRes } from "src/app/Models/tenants";
import { SaveTeacherData, deleteTeacherData, deleteTenantFromStore,saveTenantIdOnStore, setTeacherEmail, saveStudentData,setStudentEmail, deleteStudentData, saveSubjectId } from "./school.actions";
import { SubjectsDoc } from "src/app/Models/subject";

export interface IdState{
    tenantId: string|null;
}

export interface subjectIdState{
    subjectId:string|null
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
      subject:SubjectsDoc[];
    }];
    isBlocked:boolean;
}


export interface StudentState{
    studentEmail:string|null
}


export interface StudentDataState{
    name: string;
    gaurdianName: string;
    email: string;
    mobile: string;
    classNum: string;
    password:string;
}

export const initialTeacherDataState:TeacherDataState ={
        email:'',
        name:'',
        password:'',
        classNsub:[{
            classNum:'',
            subject:[]
        }],
        isBlocked:false
}

export const initialStudentDataState:StudentDataState={
    name: '',
    gaurdianName:'',
    email:'',
    mobile:'',
    classNum:'',
    password:''
}

export const initialSubjectIdState:subjectIdState ={
    subjectId:null
}


export const initialTeacherState:TeacherState ={
    email:null,
}

export const initialTenantState: IdState = {
    tenantId: null,    
}

export const initialStudentState:StudentState={
    studentEmail:null
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

export const subjectIdReducer = createReducer(
initialSubjectIdState,
on(saveSubjectId,(state,{subjectId})=>{
    console.log(subjectId,'subjectId');
    return {...state,subjectId}
})
)

export const teacherReducer = createReducer(
    initialTeacherState,
    on(setTeacherEmail,(state,{teacherEmail})=>{
        console.log(teacherEmail,'teacherEmail');
        
        return {...state,email:teacherEmail}
    })
)

export const studentReducer = createReducer(
    initialStudentState,
    on(setStudentEmail,(state,{studentEmail})=>{
        console.log(studentEmail,'studentEmail');
        
        return {...state,studentEmail:studentEmail}
    })
)


export const teacherDataReducer = createReducer(
    initialTeacherDataState,
    on(SaveTeacherData,(state,{teacherData})=>{
        console.log('reducer teacherData',{...state, ...teacherData});
        
        return { ...state, ...teacherData };
    }),on(deleteTeacherData,(state)=>{
        return {...state,teacherData:null}
    })
)



export const studentDataReducer = createReducer(
    initialStudentDataState,
    on(saveStudentData, (state, { studentData }) => {
        console.log('reducer studentData',{...state,...studentData});
        
        return { ...state, ...studentData };

    }),
    on(deleteStudentData, (state) => {
        return { ...state, studentData: null };
    })
);
