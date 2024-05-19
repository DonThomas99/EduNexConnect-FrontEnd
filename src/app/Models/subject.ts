export interface subjects {
    status:number,
    data:{
        message:string
    }
}

export interface classSubjects{
class:string
subjects:SubjectsDoc[]
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
  
  export interface SubjectsDoc{
  Id:string,
    name:string,
    _id:string
  }
  export interface subj{
    _id:string,
    name:string
  }
export interface Isubj{
  count:number,
  subjects:subj[]
}
  export interface IclassSubjects{
    class:string
    subjects:subj[]
  }