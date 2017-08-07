import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import Auth0Lock from "auth0-lock";
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  storageKey: string = 'contact-manager-jwt';

  constructor(private router: Router) {
  }

  setToken(token: string) {
    localStorage.setItem(this.storageKey, token)
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  login() {
  }

  logout() {
    localStorage.removeItem(this.storageKey);

    this.router.navigateByUrl('/login');
  }

  loggedIn() {
    return this.getToken() !== null;
    // return tokenNotExpired();
  }

}
