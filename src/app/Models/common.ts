import { type ITenantRes } from "./tenants"

export interface IApiRes <T> {
 status:number
 message:string
 data:T
}

export interface Res {
    status:number,
    message:string
}

export interface Asnmt_url{
    status:number,
    message:string,
    url:sub
}
export interface Asnmt{
    status:number,
    message:string,
    url:dub
}

export interface summary{
    status:number,
    teacherCount:number,
    studentsCount:number
}

export interface submissions{
id: any
email: string
assignmentId:string,
studentEmail:string,
grade:string
}

export interface AllSubmissions{
    status:number,
    message:string,
    submissions:submissions[]
}

export interface sub{
grade:string
file_url:string[]
}

export interface dub{
    _id:string,
    file_url:string[],
    grade:string |null
}

export interface convo{
    data:{

        _id:string,
        members:string[],
    }
    }

    export interface messages{
        _id:string,
        conversationId:string,
        sender:string,
        text:string
    }

    export interface addUsers{
senderId:string,
recieverId:string
    }