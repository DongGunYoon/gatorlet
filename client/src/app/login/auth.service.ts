import { Injectable } from '@angular/core';
import axios from 'axios';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
//import * as moment from "moment";

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://api.memorly.kro.kr/users/login';

   constructor(private snackBar: MatSnackBar,
   private router: Router) { }

  
  login(email1:string, password1:string): Observable<string> {
    const data = {
      email: email1,
      password: password1
    };

    return new Observable(observer => {
        axios.post('http://api.memorly.kro.kr/users/login', data)
          .then((response) => {
              //log response
              console.log(response);
              console.log(response.data.data.accessToken);
              console.log(response.data.data.refreshToken);

              //set jwts
              localStorage.setItem('accessToken', response.data.data.accessToken);
              localStorage.setItem('refreshToken', response.data.data.refreshToken);

              localStorage.setItem('isLoggedIn', "true");
              observer.next(response.data);
              observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
        });
    }
    // private setSession(authResult) {
    //   const expiresAt = moment().add(authResult.expiresIn,'second');

    //   localStorage.setItem('id_token', authResult.idToken);
    //   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    // }          

    logout() {
      //localStorage.removeItem("id_token");
      //localStorage.removeItem("expires_at");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isLoggedIn");
    }

    public isLoggedIn() {
      return localStorage.getItem("isLoggedIn");
      //return moment().isBefore(this.getExpiration());
    }

    // isLoggedOut() {
    //   return !this.isLoggedIn();
    // }

    // getExpiration() {
    //   const expiration = localStorage.getItem("expires_at");
    //   const expiresAt = JSON.parse(expiration);
    //   return moment(expiresAt);
    // }
}
