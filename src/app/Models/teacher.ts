export interface TeacherData {
    email:string;
    name: string;
    class: string;
    subject: string;
  }
  export interface  IteacherData{
    email:string;
    name:string;
    password:string;
    classNsub:[{
      classNum:string;
      subject:string[];
    }];
    isBlocked:boolean;
  }