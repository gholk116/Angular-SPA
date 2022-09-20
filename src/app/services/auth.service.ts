import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: any;

  constructor() { }

  setAuth(key: string, username: string) {
    let header = new HttpHeaders().set('Authorization', `Bearer ${key}`);
    this.auth = header;
    localStorage.setItem('currentUser', key);
  }

  getAuth() {
    if (this.auth == undefined && localStorage.getItem('currentUser') != null) {
      let key: any = localStorage.getItem('currentUser');
      let header = new HttpHeaders().set('Authorization', `Bearer ${key}`)
      return header;
    }
    return this.auth;
  }
}
