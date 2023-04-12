import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { MatGridListModule } from '@angular/material/grid-list';

//Different web pages
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { CreateCardComponent } from './create-card';
import { BrowseComponent } from './browse';
import { LibraryComponent } from './library';
import { CardViewComponent } from './card-view';
import { CreateFolderComponent } from './create-folder';
import { EditCardModalComponent } from './card-view';
import { EditFolderModalComponent } from './library';
import { DeleteCardModalComponent } from './card-view';
import { DeleteFolderModalComponent } from './library';
import { CardModalComponent } from './card-view';
import { FolderModalComponent } from './library';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CreateCardComponent,
    BrowseComponent,
    LibraryComponent,
    CardViewComponent,
    CreateFolderComponent,
    CardModalComponent,
    FolderModalComponent,
    EditCardModalComponent,
    EditFolderModalComponent,
    DeleteCardModalComponent,
    DeleteFolderModalComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    HttpClientModule,
    FormsModule,
    MatGridListModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
