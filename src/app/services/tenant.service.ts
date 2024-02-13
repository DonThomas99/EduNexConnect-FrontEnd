import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiRes,IApiTenantRes, Isample } from '../Models/tenants';
import { environments } from 'src/environments/environment';
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
return this.http.post<IApiTenantRes>(`${this.backendURL}/tenant/signin`,{email,password})
  }

  updateTenantDetails(tenantData:any){
    return this.http.post<IApiTenantRes>(`${this.backendURL}/tenant/updateProfile`,{tenantData})
  }
  updatePassword(data:any){
    return this.http.put<IApiTenantRes>(`${this.backendURL}/tenant/updatePassword`,{data})
  }
  createSchoolAdmin(TenantId:string,id:string,password:string,repeatPassword:string){
    return this.http.post<any>(`${this.backendURL}/tenant/saveAdmin`,{TenantId,id,password,repeatPassword})
  }
  
  
}

