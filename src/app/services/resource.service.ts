import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private url: string = 'http://localhost:8080/Kotera/resource/';
  constructor(private http: HttpClient, private authService: AuthService) { }

  read(): Observable<any> {
    let authorization: any = {
      headers: this.authService.getAuth(),
      responseType: 'text'
    }
    return this.http.get(this.url + 'read', authorization)
      .pipe(catchError(this.errorHandler));
  }

  setEntry(row: number, column: number, value: string) {
    let authorization = {
      headers: this.authService.getAuth()
    }
    let params = new HttpParams();
    params = params.append('resourceId', row);
    params = params.append('columnId', column);
    params = params.append('value', value);
    return this.http.post(this.url + 'setEntry', params, authorization)
      .pipe(catchError(this.errorHandler));
  }

  addResource() {
    let authorization = {
      headers: this.authService.getAuth()
    }
    return this.http.post(this.url + 'addResource', null, authorization)
      .pipe(catchError(this.errorHandler));
  }

  addColumn() {
    let authorization = {
      headers: this.authService.getAuth()
    }
    let params = new HttpParams().set('columnName', 'New Column')
    
    return this.http.post(this.url + 'addColumn', params, authorization)
      .pipe(catchError(this.errorHandler));
  }

  updateColumn(oldColumnName: string, newColumnName: string) {
    let authorization = {
      headers: this.authService.getAuth()
    }
    let params = new HttpParams();
    params = params.append('oldColumnName', oldColumnName);
    params = params.append('newColumnName', newColumnName);
    return this.http.post(this.url + 'updateColumn', params, authorization)
      .pipe(catchError(this.errorHandler));
  }



  errorHandler(error: HttpErrorResponse) {
    return throwError(() => console.log("ERROR in Resource service "+error.message));
  }
}
