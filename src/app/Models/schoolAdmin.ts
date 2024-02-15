import { type IApiRes } from "./common"

export interface IschoolAdminRes {
    _id:string
    adminId:string
    password:string
    isBlocked:boolean
} 
export interface IApiadminList{
    status:number
    message:string
    data :IschoolAdminRes[]
}
export interface IApiadminList extends Array<IschoolAdminRes[]>{}