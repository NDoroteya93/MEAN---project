import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { AlertComponent } from './_directives/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { PostsService } from './core/service/posts.service';
import { AuthenticationService } from './core/service/authentication.service';
import { AlertService } from './core/service/alert.service';
import { customHttpProvider } from './_helpers/custom-http';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LoginComponent,
    DashboardComponent,
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
    PostsService,
    ...AUTH_PROVIDERS,
    AuthenticationService,
    AlertService,
    customHttpProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
