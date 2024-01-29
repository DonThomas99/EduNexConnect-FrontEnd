import { type IApiRes } from "./common"

export interface ITenantAuth{
    name:string
    email:string
    mobile:number
    school:string
    address:string
    state:string   
    zip:string
}
export interface ITenantSocialAuth{
    email:string
    password:string
}

export interface ITenantRes{
    _id:string
    name:string
    email:string
    password?:string
    school:string
    mobile:number
    zip:string
    address:string
    isBlocked:boolean
    transactions:[] | []
}

export interface IApiTokenRes {
    status:number
    message:string
    accessToken:string
}

export interface IApiTenantAuthRes{
    status:number
    message:string
    data : ITenantRes | null
    token: string
    // refreshToken: string 
}
export interface  IApiTenantRes extends IApiRes<ITenantRes>{}
export interface IApiTenantsRes extends IApiRes<ITenantRes[]>{}

export { IApiRes }
