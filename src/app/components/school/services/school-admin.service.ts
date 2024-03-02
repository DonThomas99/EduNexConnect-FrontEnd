import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { IApiRes, Res } from 'src/app/Models/common';
import { IApiadminList } from 'src/app/Models/schoolAdmin';
import { classSubjects, classes, subjects } from 'src/app/Models/subject';
import { selectTenantId } from 'src/app/states/school/school.selector';
// import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';
import { environments } from 'src/environments/environment';
import { IteacherData, TeacherData } from 'src/app/Models/teacher';
import { StudentInfo } from 'src/app/Models/student';

@Injectable({
  providedIn: 'root'
})
export class SchoolAdminService implements OnInit {
backendURL = environments.backendURL


 constructor(
    private readonly http:HttpClient,
    private readonly store:Store
  ) { }
  ngOnInit(): void {

  }
  login(name:string,password:string,tenantId:string){    
return this.http.post<IApiadminList>(`${this.backendURL}/${tenantId}/admin/login`,{name,password})
  }

  //Subject and class CRUD operations 
  addSubjects(classNumber:string,subject:string,tenantId:string){
    return this.http.post<subjects>(`${this.backendURL}/${tenantId}/admin/addSubjects`,{classNumber,subject})
  }
  fetchClasses(tenantId: string): Observable<classSubjects[]> {
    return this.http.get<classes>(`${this.backendURL}/${tenantId}/admin/fetchClasses`).pipe(
      map((response: classes) => {
        if (response && response.array) {          
          return response.array;
        } else {
          throw new Error('Response data is null');
        }
      })
      );
    }
    deleteSubject(tenantId:string,classNum:string,subject:string){
      return this.http.put<Res>(`${this.backendURL}/${tenantId}/admin/deleteSubject`,{classNum,subject})
    }
    
    
    //Teacher CRUD operations 
    addTeachers(data:TeacherData,tenantId:string):Observable<Res>{    
      console.log(data);
      return this.http.post<Res>(`${this.backendURL}/${tenantId}/admin/addTeachers`,{data}).pipe(
        tap(res => console.log('Received response:', res))
      );
    }

  fetchTeacherData(tenantId:string):Observable<IteacherData[]>{
    return this.http.get<IteacherData[]>(`${this.backendURL}/${tenantId}/admin/fetchTeacherData`)
}

addSubToTeacher(teacherEmail:string,classNum:string,subject:string,tenantId:string){
  return this.http.patch<Res>(`${this.backendURL}/${tenantId}/admin/addSubToTeacher`,{teacherEmail,classNum,subject})
}


//Student CRUD operations
addStudent(student:StudentInfo,tenantId:string){
  return this.http.post<Res>(`${this.backendURL}/${tenantId}/admin/addStudent`,{student})
}

fetchStudents(tenantId:string){
  const array:StudentInfo[]=[]
  return this.http.get<typeof array>(`${this.backendURL}/${tenantId}/admin/fetchStudents`)
}

}


