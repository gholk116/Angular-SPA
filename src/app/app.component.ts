import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Head } from 'rxjs';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kotera Resources';
  constructor(private router: Router) { }
  
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
