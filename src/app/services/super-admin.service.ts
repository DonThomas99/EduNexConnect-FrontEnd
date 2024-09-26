import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { Banner, IApiTenantAuthRes, IApiTenantList, IApiTenantRes, IApiTenantsRes, IPlan, ITenantSocialAuth, addPlan, bannerResponse, planResponse } from '../Models/tenants';
import { Observable } from 'rxjs';
import { Res } from '../Models/common';
@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  backendURL = environments.backendURL
  constructor(
    private readonly http: HttpClient
  ) { }

  superAdminLogin(email: string, password: string): any {
    return this.http.post<any>(`${this.backendURL}/super-admin/login`,{email,password})
  }

  //-----------------Tenant Management-----------------------

  TenantList(){
    return this.http.get<IApiTenantList>(`${this.backendURL}/super-admin/tenantList`)
  }
  toggleTenantStatus(id:string){
    console.log('in toggle tenant');
    
    return this.http.put<any>(`${this.backendURL}/super-admin/blockTenant`,{id})
  }

  getTenantDetails(TenantId: string):Observable<IApiTenantRes> {
    console.log("id",TenantId);
    
    return this.http.get<IApiTenantRes>(`${this.backendURL}/super-admin/TenantData/${TenantId}`)
}

//-------------------Plan CRUD Operations---------------------

addPlan(planData:addPlan):Observable<Res>{
  console.log(planData);
return this.http.post<Res>(`${this.backendURL}/super-admin/addPlan`,{planData})
}
fetchPlans(){
  return this.http.get<planResponse>(`${this.backendURL}/super-admin/fetchPlans`)
}

//-------------------Banner CRUD Operations---------------
addBanner(bannerData:Banner):Observable<Res>{
console.log(bannerData)
return this.http.post<Res>(`${this.backendURL}/super-admin/Banner`,{bannerData})
}

deleteBanner(id:string){
  const params  = new HttpParams().set('bannerId',id)
return this.http.delete<Res>(`${this.backendURL}/super-admin/Banner`,{params})
}

fetchBanner(){
  return this.http.get<bannerResponse>(`${this.backendURL}/super-admin/Banner`)
}

}
