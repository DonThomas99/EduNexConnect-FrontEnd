export interface StudentInfo {
    name: string;
    gaurdianName: string;
    email: string;
    mobile: string;
    classNum: string;
   }

   export interface IStudent {
    _id:string;
    name: string;
    gaurdianName: string;
    email: string;
    mobile: string;
    classNum: string;
    password:string;
   }
   
   export interface Istudent{
    data:IStudent,
    message:string
   }