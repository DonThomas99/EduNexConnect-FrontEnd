import { SubjectsDoc } from "./subject";

export interface TeacherData {
    email:string;
    name: string;
    class: string;
    subjectId: string;
    subjectName:string;
  }
  export interface  IteacherData{
    email:string;
    name:string;
    password:string;
    classNsub:[{
      classNum:string;
      subject:SubjectsDoc[];
    }];
    isBlocked:boolean;
  }

  export interface subjectsNclass{
    _id:string,
    name:string,
    classNum:string
  }