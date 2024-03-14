import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Res } from 'src/app/Models/common';
import { IteacherData } from 'src/app/Models/teacher';
import { environments } from 'src/environments/environment';
import {IAssignmentData, IMaterialData} from 'src/app/Models/material'

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {

  backendURL = environments.backendURL
  constructor(
    private readonly http: HttpClient,
  ) { }
teacherLogin(id:string,email:string,password:string){
return this.http.post<Res>(`${this.backendURL}/${id}/teacher/login`,{email,password})
}
fetchTeacherData(tenantId:string,email:string){
  const params = new HttpParams().set('email',email)
  return this.http.get<IteacherData>(`${this.backendURL}/${tenantId}/teacher/fetchTeacherData`,{params})
}

uploadMaterial(tenantId:string,subjectId:string,data:IMaterialData){
return this.http.post<Res>(`${this.backendURL}/${tenantId}/teacher/uploadMaterial`,{subjectId,data})
}
uploadAssignment(tenantId:string,subjectId:string,data:IAssignmentData){
  
}

}
