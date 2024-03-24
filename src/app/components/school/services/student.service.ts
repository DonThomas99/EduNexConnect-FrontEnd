import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { Res } from 'src/app/Models/common';
import { IStudent } from 'src/app/Models/student';
import { SubjectName, SubjectsDoc, subj } from 'src/app/Models/subject';
import { map } from 'rxjs';
import { IMatAsmnt } from 'src/app/Models/material';

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

  // return this.http.get<IStudent>(`${this.backendURL}/${tenantId}/student/fetchStudentData`,{params})
  return this.http.get<any>(`${this.backendURL}/${tenantId}/student/fetchStudentData`, { params }).pipe(
    map(response => {
      // Assuming the response has the necessary fields to map to IStudent
      return {
        name: response.data.name,
        gaurdianName: response.data.gaurdianName,
        email: response.data.email,
        mobile: response.data.mobile,
        classNum: response.data.classNum,
        password: response.data.password
      };
    })
 );

}

fetchSubjects(classNum:string,email:string,tenantId:string){
  console.log();
  
  const params = new HttpParams()
    .set('email', email)
    .append('classNum', classNum);


  return this.http.get<subj[]>(`${this.backendURL}/${tenantId}/student/fetchSubjects`,{params})
}

fetchMatAsnmt(tenantId:string,subjectId:string){
  const params = new HttpParams()
  .set('subjectId',subjectId)
  return this.http.get<IMatAsmnt[]>(`${this.backendURL}/${tenantId}/student/fetchAsnmtMat`,{params})
}

}
