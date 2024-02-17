import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { IApiadminList } from 'src/app/Models/schoolAdmin';
import { selectTenantId } from 'src/app/states/school/school.selector';
// import { selectTenantDetails } from 'src/app/states/tenant/tenant.selector';
import { environments } from 'src/environments/environment';

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
    console.log(
     tenantId, 'jee'
    );
    
return this.http.post<IApiadminList>(`${this.backendURL}/${tenantId}/admin/login`,{name,password})
  }
}


