import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpHeaders } from '@angular/common/http';
import { Subject, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "yang";
  password: string = "123456";
  user: any;
  timeCreated: any;
  signup: boolean = false;
  invalidLogin: boolean = false;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    this.userService.createAuthenticationToken(this.username, this.password).subscribe(val => {
      this.storeAuthorization(val);
      this.invalidLogin = this.userService.invalidValidation;
      this.router.navigateByUrl('/resource');
    });
  }

  register() {
    this.user = this.userService.register(this.username, this.password).subscribe();
  }

  storeAuthorization(key: string) {
    this.authService.setAuth(key, this.username);
  }

  

}
