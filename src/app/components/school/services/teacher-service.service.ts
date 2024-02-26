import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Res } from 'src/app/Models/common';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {

  backendURL = environments.backendURL
  constructor(
    private readonly http: HttpClient
  ) { }
teacherLogin(id:string,email:string,password:string){
return this.http.post<Res>(`${this.backendURL}/${id}/teacher/login`,{email,password})
}
fetchTeacherData(id:string){
  return this.http.get<Res>(`${this.backendURL}/${id}/teacher/login`)
}

}
