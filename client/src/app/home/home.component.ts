import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({ templateUrl: 'home.component.html',
styleUrls: ["./home.component.css"] })

export class HomeComponent {

    constructor(private authService: AuthService) {}

    public isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

}