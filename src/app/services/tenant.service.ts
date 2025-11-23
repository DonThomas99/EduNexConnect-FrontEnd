import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiRes,IApiTenantRes, IPlan, Isample, planResponse } from '../Models/tenants';
import { environments } from 'src/environments/environment';
import { IApiadminList, IschoolAdminRes } from '../Models/schoolAdmin';
import { Res, subscriptionSuccess } from '../Models/common';
// import {IApiRes} from '../Models/common'

@Injectable({
  providedIn: 'root'
})

export class TenantService {
  constructor(
    private readonly http:HttpClient
  ) { }

  backendURL = environments.backendURL


  getTenantDetails(TenantId: string):Observable<IApiTenantRes> {
      return this.http.get<IApiTenantRes>(`${this.backendURL}/tenant/${TenantId}`)
  }

  saveTenantTemp(tenantData: any){
    return this.http.post<IApiTenantRes>(`${this.backendURL}/tenant/signup`,{tenantData})
  }
  resendOtp(){
    return this.http.get<Isample>(`${this.backendURL}/tenant/resendOtp`)
  }

  verifyOtp(otp:number){
   return this.http.post<IApiTenantRes>(`${this.backendURL}/tenant/verifyOtp`,{otp})
  }
  login(email:string,password:string){
    return this.http.post<IApiTenantRes>(`${this.backendURL}/tenant/signin`,{email,password}, {withCredentials: true})
  }
  
  logout(){
    return this.http.post<any>(`${this.backendURL}/tenant/signout`, {}, {withCredentials: true})
  }
//----------------------Tenant Profile Management--------------------------------

  updateTenantDetails(tenantData:any){
    return this.http.post<IApiTenantRes>(`${this.backendURL}/tenant/updateProfile`,{tenantData})
  }
  updatePassword(data:any){
    return this.http.put<IApiTenantRes>(`${this.backendURL}/tenant/updatePassword`,{data})
  }

  //--------------School Admin Management-----------------------

  createSchoolAdmin(TenantId:string,id:string,password:string,repeatPassword:string){
    return this.http.post<any>(`${this.backendURL}/tenant/saveAdmin`,{TenantId,id,password,repeatPassword})
  }
  fetchAdminList(id:string){
    return this.http.get<IApiadminList>(`${this.backendURL}/tenant/adminList?id=${id}`)
  }

  //---------------------Subscription Management-----------------

fetchPlans(){
  return this.http.get<planResponse>(`${this.backendURL}/tenant/fetchPlans`)
}  
subscribePlan(tenantId:string,plan:IPlan){
  const date= new Date()
return this.http.post<subscriptionSuccess>(`${this.backendURL}/tenant/subscribePlan`,{tenantId,plan,date})
}
confirmSubscription(tenantId:string){
  return this.http.post<Res>(`${this.backendURL}/tenant/saveSubscription`,{tenantId})
}

}

