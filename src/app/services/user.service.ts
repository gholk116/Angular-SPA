import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://localhost:8080/Kotera/users/';
  private users:any;
  invalidValidation: boolean = false;
  constructor(private http: HttpClient) {
    
   }
  setvalid(cond: boolean){
    this.invalidValidation = cond;
  }

  register(username: string, password: string): Observable<string> {
    let user = {
      "username": username,
      "password": password
    }
    return this.http.post(this.url+'register', user, {responseType: 'text'})
      .pipe(catchError(this.errorHandler));
  }

  createAuthenticationToken(username: string, password: string): Observable<any> {
    let user = {
      "username": username,
      "password": password
    }
    return this.http.post(this.url+'login', user, {responseType: 'text'})
      .pipe(catchError(this.loginErrorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => console.log(error.message))
  }

  loginErrorHandler(error: HttpErrorResponse) {
    this.setvalid(true);
    return throwError(() => console.log(error.message))
  }
}
