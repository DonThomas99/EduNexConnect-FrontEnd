import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const tenantToken = localStorage.getItem('tenantJwt')
   
   if(tenantToken){
console.log("tenanttoken:",tenantToken);

    const newRequest = request.clone({
      headers: request.headers.set('Authorization','Bearer ' + tenantToken)
    })
    console.log('url in interceptor:',newRequest.url);
    
    return next.handle(newRequest)
   }
   return next.handle(request);
   
   
  }
}
