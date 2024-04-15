import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { Asnmt_url, Res } from 'src/app/Models/common';
import { IStudent } from 'src/app/Models/student';
import { SubjectName, SubjectsDoc, subj } from 'src/app/Models/subject';
import { map } from 'rxjs';
import { IMat, IMatAsmnt, UAsmnt } from 'src/app/Models/material';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';

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

fetchMaterials(tenantId:string,subjectId:string){
  const params = new HttpParams()
  .set('subjectId',subjectId)
  return this.http.get<IMatAsmnt[]>(`${this.backendURL}/${tenantId}/student/fetchMaterials`,{params})
}

fetchAssignments(tenantId:string,subjectId:string,page:number,limit:number){
  const params = new HttpParams()
  .set('subjectId',subjectId)
  .append('page',page)
  .append('limit',limit)
  return this.http.get<IMat>(`${this.backendURL}/${tenantId}/student/fetchAssignments`,{params})
}

fetchMatAsnmt(tenantId:string,subjectId:string,page:number,limit:number){
  const params = new HttpParams()
  .set('subjectId',subjectId)
  .append('page',page)
  .append('limit',limit)
  return this.http.get<IMat>(`${this.backendURL}/${tenantId}/student/fetchAsnmtMat`,{params})
}

fetchRoomId(tenantId:string,subjectId:string,classNum:string){
console.log('ufyufttyg',classNum);

  const params = new HttpParams()
  .set('subjectId',subjectId)
  .append('classNum',classNum)
  return this.http.get<Res>(`${this.backendURL}/${tenantId}/student/fetchRoomId`,{params})
}

uploadAssignment(tenantId:string,data:UAsmnt){
  console.log(data);
  const params = new HttpParams ()
  .append('assignmentId',data.assignmentId)
  .append('studentEmail',data.studentEmail)
  .append('id',tenantId)
    const formData = new FormData()
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
          const value = data[key as keyof UAsmnt]; // Type assertion here
          formData.append(key, value);
      }
  }
  formData.forEach((value, key) => {
    console.log(key, value);
});
    return this.http.post<Asnmt_url>(`${this.backendURL}/${tenantId}/student/uploadAssignment`,formData,{params})
} 

fetchSubmissions(tenantId:string,studentEmail:string,assignmentId:string){
  const params = new HttpParams()
  .append('assignmentId',assignmentId)
  .append('studentEmail',studentEmail)
  return this.http.get<Asnmt_url>(`${this.backendURL}/${tenantId}/student/fetchSubmissions`,{params})
}

}
