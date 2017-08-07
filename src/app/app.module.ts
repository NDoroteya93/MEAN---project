import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './_directives/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthService } from './core/service/auth.service';
import { AlertService } from './core/service/alert.service';
import { ApiService } from './core/service/api.service';
// import { customHttpProvider } from './_helpers/custom-http';

@NgModule({
  declarations: [
    AppComponent,
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
    ApiService,
    AuthService,
    AlertService
    // customHttpProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
