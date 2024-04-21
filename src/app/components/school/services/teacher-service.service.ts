import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asnmt_url, Res } from 'src/app/Models/common';
import { IteacherData } from 'src/app/Models/teacher';
import { environments } from 'src/environments/environment';
import {IAssignmentData, IMatAsmnt, IMaterialData, IMaterials, Isubmission} from 'src/app/Models/material'
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

uploadMaterial(tenantId:string,subjectId:string,teacherId:string,data:IMaterialData){  

  // const params = new HttpParams()
  // .append('teacherId',teacherId)
  // .append('subjectId',subjectId)
  // .append('id',tenantId)
  // .append('materialTitle',data.materialTitle)
  // .append('content',data.content)
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
uploadAssignment(tenantId:string,subjectId:string,teacherId:string,data:IAssignmentData){  
  return this.http.post<Res>(`${this.backendURL}/${tenantId}/teacher/uploadAssignment`,{subjectId,teacherId,data})
}
fetchMaterials(tenantId:string,subjectId:string,teacherId:string){
  const params = new HttpParams()
  .set('subjectId',subjectId)
  .append('teacherId', teacherId)
  return this.http.get<IMatAsmnt[]>(`${this.backendURL}/${tenantId}/teacher/fetchMaterials`,{params})
}

fetchStudents(tenantId:string,classNum:string){
  const params = new HttpParams().set('classNum',classNum)
  return this.http.get<StudentInfo[]>(`${this.backendURL}/${tenantId}/teacher/getStudentsByClass`,{params})
}
startVideoClass(tenantId:string,classNum:string,subjectId:string,roomId:string){
  return this.http.put<Res>(`${this.backendURL}/${tenantId}/teacher/startClass`,{classNum,subjectId,roomId})
}
endClass(tenantId:string,classNum:string,subjectId:string){
  return this.http.put<Res>(`${this.backendURL}/${tenantId}/teacher/endClass`,{classNum,subjectId})
}

fetchSubmissions(email:string,assignmentId:string,tenantId:string){
  const params = new HttpParams()
  .append('email',email)
  .append('assignmentId',assignmentId)
  return this.http.get<Asnmt_url>(`${this.backendURL}/${tenantId}/teacher/fetchSubmissions`,{params})
}

deleteAssignments(tenantId:string,assignmentId:string){
  const params = new HttpParams()
  .append('assignmentId',assignmentId)
return this.http.delete<Res>(`${this.backendURL}/${tenantId}/teacher/deleteAssignment`,{params})
}

gradeAssignment(tenantId:string,data:OGrade){
  return this.http.post<Res>(`${this.backendURL}/${tenantId}/teacher/gradeAssignment`,data)
}

}
