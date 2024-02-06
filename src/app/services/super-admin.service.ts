import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { IApiTenantRes, ITenantSocialAuth } from '../Models/tenants';
import { Observable } from 'rxjs';
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
  TenantList(){
    return this.http.get<any>(`${this.backendURL}/super-admin/tenantList`)
  }
  toggleTenantStatus(id:any){
    console.log('in toggle tenant');
    
    return this.http.put<any>(`${this.backendURL}/super-admin/blockTenant`,{id})
  }

  getTenantDetails(TenantId: string):Observable<IApiTenantRes> {
    console.log("id",TenantId);
    
    return this.http.get<IApiTenantRes>(`${this.backendURL}/super-admin/TenantData/${TenantId}`)
}

}
