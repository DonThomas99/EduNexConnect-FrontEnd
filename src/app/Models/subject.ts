export interface subjects {
    status:number,
    data:{
        message:string
    }
}

export interface classSubjects{
classNumber:number
subjects:string[]|[]
}

export interface classes{
    status:number,
    data:{
        array:classSubjects[]
    }
}