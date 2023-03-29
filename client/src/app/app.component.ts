import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  title = 'CEN3031Project';
  public username: string = '';

  public readBoolFromLocal(key: string): boolean{
    return localStorage.getItem(key) === 'true';
  } 
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  public logout() {
    this.authService.logout();
  }
}
