import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllSubmissions, Asnmt, Asnmt_url, Res } from 'src/app/Models/common';
import { IteacherData } from 'src/app/Models/teacher';
import { environments } from 'src/environments/environment';
import {IAssignmentData, IMat, IMatAsmnt, IMaterialData, IMaterials, Isubmission} from 'src/app/Models/material'
import { StudentInfo } from 'src/app/Models/student';
import { IAssignments, OGrade } from 'src/app/Models/assignments';

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

fetchStudents(tenantId:string,classNum:string){
  const params = new HttpParams().set('classNum',classNum)
  return this.http.get<StudentInfo[]>(`${this.backendURL}/${tenantId}/teacher/getStudentsByClass`,{params})
}

fetchSubmissions(email:string,assignmentId:string,tenantId:string){
  const params = new HttpParams()
  .append('email',email)
  .append('assignmentId',assignmentId)
  return this.http.get<Asnmt>(`${this.backendURL}/${tenantId}/teacher/fetchSubmissions`,{params})
}

fetchAllSubmissions(tenantId:string,subjectId:string){
  const params = new HttpParams()
  .set('subjectId',subjectId)
  console.log('The call is being sent ');
  
  return this.http.get<AllSubmissions>(`${this.backendURL}/${tenantId}/teacher/fetchAllSubmissions`,{params})
}

//Material Services
uploadMaterial(tenantId:string,subjectId:string,teacherId:string,data:IMaterialData){  

  const formData = new FormData();
   for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key as keyof IMaterialData];
      formData.append(key, value instanceof Blob ? value : value.toString());
    }
    formData.append('tenantId',tenantId)
    formData.append('subjectId',subjectId)
    formData.append('teacherId',teacherId)
  }
  formData.forEach((value, key) => {
    console.log(key, value);
  });
  
  return this.http.post<Res>(`${this.backendURL}/${tenantId}/teacher/uploadMaterial`,formData)
}

fetchMaterials(tenantId:string,subjectId:string,page:number){
  const params = new HttpParams()
  .set('subjectId',subjectId)
  .append('page',page)
  return this.http.get<IMat>(`${this.backendURL}/${tenantId}/teacher/fetchMaterials`,{params})
}

updateMaterial(tenantId:string,materialId:string,data:Partial<IMatAsmnt>){
  return this.http.patch<Res>(`${this.backendURL}/${tenantId}/teacher/updateMaterial`,{data,materialId})
 }

//  Assignment Services 

fetchAssignments(tenantId:string,subjectId:string,page:number){
  const params = new HttpParams()
  .set('subjectId',subjectId)
  .append('page',page)
  return this.http.get<IMat>(`${this.backendURL}/${tenantId}/teacher/fetchAssignments`,{params})
}

uploadAssignment(tenantId:string,subjectId:string,teacherId:string,data:IAssignmentData){  
  const formData = new FormData();
   for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key as keyof IAssignmentData];
      formData.append(key, value instanceof Blob ? value : value.toString());
    }
    formData.append('tenantId',tenantId)
    formData.append('subjectId',subjectId)
    formData.append('teacherId',teacherId)
  }
  return this.http.post<Res>(`${this.backendURL}/${tenantId}/teacher/uploadAssignment`,formData)
}

deleteAssignments(tenantId:string,assignmentId:string){
  const params = new HttpParams()
  .append('assignmentId',assignmentId)
return this.http.delete<Res>(`${this.backendURL}/${tenantId}/teacher/deleteAssignment`,{params})
}

gradeAssignment(tenantId:string,data:OGrade){
  return this.http.post<Res>(`${this.backendURL}/${tenantId}/teacher/gradeAssignment`,data)
}

updateAssignment(tenantId: string, assignmentId: string, data: Partial<IMatAsmnt>) {
  return this.http.post<Res>(`${this.backendURL}/${tenantId}/teacher/updateAssignment`,{data,assignmentId});
 }

//Video Class Services

startVideoClass(tenantId:string,classNum:string,subjectId:string,roomId:string){
  return this.http.put<Res>(`${this.backendURL}/${tenantId}/teacher/startClass`,{classNum,subjectId,roomId})
}
endClass(tenantId:string,classNum:string,subjectId:string){
  return this.http.put<Res>(`${this.backendURL}/${tenantId}/teacher/endClass`,{classNum,subjectId})
}

}
