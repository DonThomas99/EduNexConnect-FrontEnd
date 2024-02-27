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
