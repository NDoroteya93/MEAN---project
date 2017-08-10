import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './_directives';
import { HomeComponent } from './home/home.component';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthService } from './core/service/auth';
import { AuthGuard } from './_guard';
import { AlertService } from './core/service/alert';
import { ApiService } from './core/service/api';
import { UserService } from './core/service/user';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    ...AUTH_PROVIDERS,
    ApiService,
    AuthService,
    AlertService,
    AuthGuard,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
