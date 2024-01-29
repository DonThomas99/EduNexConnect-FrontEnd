import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';
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

}
