import { type IApiRes } from "./common"
import { IschoolAdminRes } from "./schoolAdmin"

export interface ITenantAuth{
    name:string
    email:string
    mobile:number
    school:string
    address:string
    state:string   
    city:string
    zip:string
}
export interface ITenantSocialAuth{
    email:string
    password:string
}

export interface ITenantTransaction{
    transactionType: string,
    method:string,
    amount: number,
    date:Date
}
export interface Isample{
    status:number,
    message:boolean
}


export interface ITenantRes{
    _id:string
    name:string
    email:string
    password?:string
    school:string
    state:string
    city:string
    mobile:number
    zip:string
    address:string
    isBlocked:boolean
    schoolAdmins:IschoolAdminRes[]
    transactions: ITransaction[]
    
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
export interface IApiTenantList{
    status:number
    message:string
    data :{
       arr: ITenantRes[]
       len:number
    }
        
    token: string
    // refreshToken: string 
}

export interface addPlan{
    planName:string,
    durationUnit:string,
    durationValue:number,
    amount:number
}

export interface planResponse{
status:number,
message:string,
data:IPlan[]
}

export interface IPlan{
    _id:string,
    planName:string,
    durationUnit:string,
    durationValue:number,
    amount:number
}

export interface ITransaction{
    _id:string,
    planId:string,
    amount:number,
    transactionType:string,
    transactionId:string,
    date:Date,
    expiryDate:Date
}

export interface  IApiTenantRes extends IApiRes<ITenantRes>{}
export interface IApiTenantsRes extends IApiRes<ITenantRes[]>{}

export { IApiRes }
