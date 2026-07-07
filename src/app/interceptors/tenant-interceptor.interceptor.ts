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
    // The JWT lives in an httpOnly cookie set by the backend, so the browser
    // attaches it automatically - this just needs to allow credentials
    // (cookies) to be sent on cross-origin requests to the backend.
    const withCredentials = request.clone({withCredentials:true})
    return next.handle(withCredentials)
  }
}
