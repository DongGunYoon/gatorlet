import {MatSnackBar} from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import axios from 'axios';
import { from } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';


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


    public togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
      }

      

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService) {}

  login(email1 : string,  password1 : string){
    
    from(this.authService.login(email1, password1))
      .subscribe({
        next: response => {
            //log response
            console.log(response);

            this.snackBar.open('Login successful', 'x', {duration: 10000});        

            // Navigate to the home page or other protected routes
            this.router.navigateByUrl('library');

        },
        error: error => {
            console.error(error);
            if(error.response.status >= 500){
              this.snackBar.open('This one\'s on us... try again later', 'x', {duration: 10000});
            }
            else if(error.response.status === 404){
              this.snackBar.open('Account with given email not found', 'x', {duration: 10000});
            }
            else if(error.response.status === 401){
              this.snackBar.open('Incorrect password', 'x', {duration: 10000});
            }
            else if(error.response.message === 'Binding Error'){
              this.snackBar.open('Please fill out each form', 'x', {duration: 10000});
            }
      }
      });
    }
  }