import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'

})
export class AuthService {
  backendUrl = environments.backendURL
  constructor(
    private http:HttpClient
    ) { }
    
    extractUrl(request:string){
      return this.http.get(`${this.backendUrl}/${request}`,{withCredentials:true})
      .pipe(map(response=>{
        console.log(response);
        
        return response}),
        
        catchError(error=>{
        //  this.route.navigate['/']
          return throwError(error)
        }

          // console.log(error);
          ) )
    }

  }
