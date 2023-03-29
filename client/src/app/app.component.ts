import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CEN3031Project';
  public isLoggedIn: boolean = true;
  public username: string = '';

  public readBoolFromLocal(key: string): boolean{
    return localStorage.getItem(key) === 'true';
  }
  ngOnInit(){
    this.isLoggedIn = this.readBoolFromLocal('isLoggedIn');
  }
}
