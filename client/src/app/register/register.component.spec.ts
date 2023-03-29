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
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
    
      it('should set \'isPasswordValid\' to false if password is under 8 characters', () => {
        component.password = '1234';
        component.validatePassword();

        expect(component.isPasswordValid).toBeFalse();
      });

      it('should set \'isPasswordValid\' to true if password is 8 characters', () => {
        component.password = '12345678';
        component.validatePassword();

        expect(component.isPasswordValid).toBeTrue();
      });

      it('should set \'isUsernameValid\' to false if username contains non-alpha-numeric characters', () => {
        
        component.username = 'test=+[}\\';
        component.validateUsername();

        expect(component.isUsernameValid).toBeFalse();
      });

      it('should set \'isUsernameValid\' to true if username does not contain non-alpha-numeric characters', () => {
        
        component.username = 'test1';
        component.validateUsername();

        expect(component.isUsernameValid).toBeTrue();
      });
    })