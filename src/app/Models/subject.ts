export interface subjects {
    status:number,
    data:{
        message:string
    }
}

export interface classSubjects{
classNumber:string
subjects:string[]
}

export interface classes{
    
    
    array:classSubjects[]
    
}

export  interface Subject {
    class: string;
    subjects: SubjectName[];
  }
  
  export interface SubjectName {
    name: string;
  }
  