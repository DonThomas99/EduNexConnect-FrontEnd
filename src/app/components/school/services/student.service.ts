import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { Res } from 'src/app/Models/common';
import { IStudent } from 'src/app/Models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
backendURL = environments.backendURL
  constructor(
    private readonly http: HttpClient    
  ) { }
studentLogin(tenantId:string,email:string,password:string){  
// return this.http.post<Res>(`${this.backendURL}/${tenantId}/admin/login`,{email,password})
  return this.http.post<Res>(`${this.backendURL}/${tenantId}/student/login`,{email,password})
}
fetchStudentData(tenantId:string,email:string){
  const params = new HttpParams().set('email',email)

  return this.http.get<IStudent>(`${this.backendURL}/${tenantId}/student/fetchStudentData`,{params})
}

}
