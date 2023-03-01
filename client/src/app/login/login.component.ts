/*

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
*/
import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Component({ templateUrl: 'login.component.html',
styleUrls: ["./login.component.css"],

selector: 'app-login',
template: `
  <form (submit)="login()">
    <label for="email">Email</label>
    <input type="email" name="email" [(ngModel)]="email">

    <label for="password">Password</label>
    <input type="password" name="password" [(ngModel)]="password">

    <button type="submit">Login</button>
  </form>
`,})
export class LoginComponent {
    public showPassword: boolean = false;

    email: string = "";
  password: string = "";

    public togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
      }

      

  constructor(private authService: AuthService) {}

  login(email1 : string,  password1 : string) {

    const email = email1;
    const password = password1;

    this.authService.login(email, password)
      .then(() => {
        // Navigate to the home page or other protected routes
      });
  }
}



