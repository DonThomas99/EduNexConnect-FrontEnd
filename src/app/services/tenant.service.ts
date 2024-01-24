import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiRes,IApiTenantRes } from '../Models/tenants';
// import {IApiRes} from '../Models/common'

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  getTenantDetails(TenantId: string) {
      throw new Error('Method not implemented.');
  }

  constructor() { }
}
