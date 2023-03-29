import { TestBed, ComponentFixture } from '@angular/core/testing';
//import { Component } from '@angular/core';
//import {MatSnackBar} from '@angular/material/snack-bar';
//import {Router} from '@angular/router';
//import { NgModule } from '@angular/core';
//import { NgMaterialModule } from '../ng-material/ng-material.module';
//import axios from 'axios';
import { RegisterComponent } from './register.component';
import { AppModule } from '../app.module';

describe('RegisterComponent', () => {

    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let userInput: HTMLInputElement;
    let passwordValidity: boolean;
    let userValidity: boolean;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
          declarations: [ RegisterComponent ],
          imports: [
            //Component,
            //MatSnackBar,
            //Router,
            AppModule
            //NgModule,
            //NgMaterialModule
            //axios
          ]
        }).compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        emailInput = fixture.nativeElement.querySelector('#email');
        passwordInput = fixture.nativeElement.querySelector('#password');
        userInput = fixture.nativeElement.querySelector('#username');
        passwordValidity = fixture.nativeElement.querySelector('#isPasswordValid');
        userValidity = fixture.nativeElement.querySelector('#isUsernameValid')
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    
      it('should set \'isPasswordValid\' to false if password is under 8 characters', () => {
        passwordInput.value = '1234';
        passwordInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        

        expect(passwordValidity).toBeFalse();
      });

      it('should set \'isUsernameValid\' to false if username contains non-alpha-numeric characters', () => {
        userInput.value = 'test=+[}\\';
        userInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        expect(userValidity).toBeFalse();
      });

})