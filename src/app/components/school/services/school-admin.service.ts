import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { IApiRes } from 'src/app/Models/common';
import { IApiadminList } from 'src/app/Models/schoolAdmin';
import { classSubjects, classes, subjects } from 'src/app/Models/subject';
import { selectTenantId } from 'src/app/states/school/school.selector';
// import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';
import { environments } from 'src/environments/environment';
import { TeacherData } from 'src/app/Models/teacher';

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
  addTeachers(data:TeacherData,tenantId:string){    
    console.log(data);
    
    return this.http.post<IApiadminList>(`${this.backendURL}/${tenantId}/admin/addTeachers`,{data})
  }
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
}


