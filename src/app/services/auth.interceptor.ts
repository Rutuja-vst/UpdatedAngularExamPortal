import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login: LoginService,
              private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //add the jwt token (localStorage) request
    let authReq = req;
    const token = this.login.getToken();
    console.log('inside interceptor');

    if (token != null && token && !this.isTokenExpired(token)) {
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    
    else{
      this.router.navigate(['/login'])
      }
    return next.handle(authReq);
  }
  private isTokenExpired(token: string): boolean {
    // Decode the token to extract the expiration date
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return true; // Invalid token format
    }
  
    const payload = JSON.parse(atob(tokenParts[1]));
    const expirationDate = new Date(payload.exp * 1000); // Convert expiration time to milliseconds
  
    return expirationDate.getTime() < Date.now();
  }
}


export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  
];
