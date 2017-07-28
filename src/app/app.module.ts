import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import { PostsService } from './core/service/posts.service';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
