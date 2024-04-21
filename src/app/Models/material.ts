export interface IMaterialData {
    content: string;
    materialTitle: string;
    pdf: File;
    
  }
  
  export interface IAssignmentData{
    content:string;
    assignmentTitle:string;
    pdf:string;
   dateTime:Date
    
  }

  export interface IMaterials {
    subjectId:string;
    teacherId:string;
    materialTitle:string;
    pdf:string;
    content:string;
  }
  export interface IMatAsmnt{
    _id:string
    subjectId:string;
    teacherId:string;
    materialTitle:string;
    assignmentTitle:string;
    content:string;
    pdf:string[];
    createdAt:Date
    submissionDate:Date
  }

  export interface Material{
    materialTitle:string;
  }

  export interface Assignment{
    assignmentTitle:string;
    submissionDate:string;
  }
  export interface IMat{
Mat:IMatAsmnt[],
count:number
  }

  export interface UAsmnt{
    id:string,
    studentEmail:string,
    assignmentId:string,
    file:File
  }

  export interface Isubmission{
    file_url:string[]
  }

  // export type Item = IMaterials | IMA