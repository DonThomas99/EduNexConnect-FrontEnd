import { createReducer,on } from "@ngrx/store";
import { type ITenantRes } from "src/app/Models/tenants";
import { SaveTeacherData, deleteTeacherData, deleteTenantFromStore,saveTenantIdOnStore, setTeacherEmail, saveStudentData,setStudentEmail, deleteStudentData, saveSubjectId, saveClassNum, deleteSubjectId, deleteClassNum, deleteTeacherEmail, saveAsnmt, deleteAsnmt } from "./school.actions";
import { SubjectsDoc } from "src/app/Models/subject";
// import { state } from "@angular/animations";

export interface IMatAsmntState{
    _id:string;
    subjectId:string;
    teacherId:string;
    materialTitle:string;
    assignmentTitle:string;
    content:string;
    pdf:string[];
    createdAt:Date
    submissionDate:Date
}

export interface IdState{
    tenantId: string|null;
}

export interface classNumState{
    classNum:string|null
}

export interface subjectIdState{
    subjectId:string|null
}

export interface TeacherState{
    email:string|null
}

export interface TeacherDataState{
    _id:string;
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

export const IMatAsmntInitialState:IMatAsmntState ={
    _id:'',
    subjectId:'',
    teacherId:'',
    materialTitle:'',
    assignmentTitle:'',
    content:'',
    pdf:[],
    createdAt:new Date(0),
    submissionDate:new Date(0)
}

export const classNumInitialState:classNumState={
    classNum:''
}

export const initialTeacherDataState:TeacherDataState ={
    _id:'',
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
}),
on(deleteSubjectId,(state)=>{
    return {...state,subjectId:null}
})
)

export const classNumReducer = createReducer(
    classNumInitialState,
    on(saveClassNum,(state,{classNum})=>{
        console.log(classNum,'classNum reducer reached');
        return {...state,classNum:classNum}
    }),
    on(deleteClassNum,(state)=>{
        return {...state,classNum:null}
    })
) 

export const teacherReducer = createReducer(
    initialTeacherState,
    on(setTeacherEmail,(state,{teacherEmail})=>{
        console.log(teacherEmail,'teacherEmail');
        
        return {...state,email:teacherEmail}
    }),
    on(deleteTeacherEmail,(state)=>{
        return {...state,teacherEmail:null}
    })
)

export const studentReducer = createReducer(
    initialStudentState,
    on(setStudentEmail,(state,{studentEmail})=>{
        console.log(studentEmail,'studentEmail');
        
        return {...state,studentEmail:studentEmail}
    }),
    on(deleteStudentData,(state)=>{
        return {...state,studentEmail:null}
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

export const assignmentReducer = createReducer(
    IMatAsmntInitialState,
    on(saveAsnmt,(state,{upload})=>{
        console.log('reducer AssignmentData',{...state,...upload});
        return {...state, ...upload}
    }),
    on(deleteAsnmt, (state)=>{
        return {...state, upload:null}
    })
) 
