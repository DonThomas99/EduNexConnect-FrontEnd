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
    url:string[]
}

export interface summary{
    status:number,
    teacherCount:number,
    studentsCount:number
}