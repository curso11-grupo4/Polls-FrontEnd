import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public securityService: SecurityService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // From Angular to ApiGateway
    let currentSession = this.securityService.userCurrentSession;
    if(currentSession){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${currentSession.token}`
        }
      });
    }
    // Process response from API Gateway
    return next.handle(request).pipe(
      cathError((err: HttpErrorResponse) => {
        if(err.status === 401){
          this.router.navigateByUrl('/pages/dashboard');
        }
        return throwError(err);
      })
    );
  }
}
function cathError(arg0: (err: HttpErrorResponse) => Observable<never>): import("rxjs").OperatorFunction<HttpEvent<any>, HttpEvent<unknown>> {
  throw new Error('Function not implemented.');
}

