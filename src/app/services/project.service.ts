import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url: string = 'http://localhost:8080/Kotera/project/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  read(projectId: number) {

    let httpparams = new HttpParams().append('projectId', projectId);


    return this.http.get(this.url + 'read', {headers: this.authService.getAuth(), params: httpparams, responseType: 'text'})
      .pipe(catchError(this.errorHandler));
  }

  addResourceToProject(projectId: number, resourceId: number) {
    let authorization = {
      headers: this.authService.getAuth()
    }

    let params = new HttpParams();
    params = params.append('projectId', projectId);
    params = params.append('resourceId', resourceId);

    return this.http.post(this.url + 'addResourceToProject', params, authorization)
      .pipe(catchError(this.errorHandler));
  }

  deleteResource(projectId: number, resourceId: number) {
    let authorization = {
      headers: this.authService.getAuth()
    }

    let params = new HttpParams();
    params = params.append('projectId', projectId);
    params = params.append('resourceId', resourceId);

    return this.http.post(this.url + 'deleteResource', params, authorization)
      .pipe(catchError(this.errorHandler));
  }

  addTemplate(projectId: number, columnName: string, columnType: any, formula: string) {
    let authorization = {
      headers: this.authService.getAuth()
    }

    let params = new HttpParams();
    params = params.append('projectId', projectId);
    params = params.append('columnName', columnName);
    params = params.append('columnType', columnType);
    params = params.append('formula', formula);

    return this.http.post(this.url + 'addTemplate', params, authorization)
      .pipe(catchError(this.errorHandler));
  }

  deleteTemplate(projectId: number, columnName: string) {
    let authorization = {
      headers: this.authService.getAuth()
    }

    let params = new HttpParams();
    params = params.append('projectId', projectId);
    params = params.append('columnName', columnName);

    return this.http.post(this.url + 'deleteTemplate', params, authorization)
      .pipe(catchError(this.errorHandler));
  }

  updateTemplate(projectId: number, columnName: string, columnType: any, formula: string) {
    let authorization = {
      headers: this.authService.getAuth()
    }

    let params = new HttpParams();
    params = params.append('projectId', projectId);
    params = params.append('columnName', columnName);
    params = params.append('columnType', columnType);
    params = params.append('formula', formula);

    return this.http.put(this.url + 'updateTemplate', params, authorization)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => console.log("ERROR in Project service "+error.message));
  }

}
