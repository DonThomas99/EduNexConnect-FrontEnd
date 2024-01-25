import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiRes,IApiTenantRes } from '../Models/tenants';
// import {IApiRes} from '../Models/common'

@Injectable({
  providedIn: 'root'
})

export class TenantService {
  constructor(
    private readonly http:HttpClient
  ) { }
  getTenantDetails(TenantId: string):Observable<IApiTenantRes> {
      return this.http.get<IApiTenantRes>(`tenant/${TenantId}`)
  }

  

  saveTenantTemp(TenantData: any){
    return this.http.post<IApiTenantRes>(`tenant/signup`,{TenantData})
  }

  verifyOtp(otp:number){
   return this.http.post<IApiTenantRes>(`tenant/verifyOtp`,{otp})
  }
}

