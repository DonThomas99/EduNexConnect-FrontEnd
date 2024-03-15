export interface IMaterialData {
    content: string;
    materialTitle: string;
    pdf: string;
  }
  
  export interface IAssignmentData{
    content:string;
    assignmentTitle:string;
    pdf:string;
    date:string;
    time:string;
    
  }

  export interface IMaterials {
    subjectId:string;
    teacherId:string;
    materialTitle:string;
    pdf:string;
    content:string;
  }