import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

declare let Auth0Lock: any;

@Injectable()
export class AuthenticationService {

  lock = new Auth0Lock('YOUR-AUTH0-CLIENT-ID', 'YOUR-AUTH0-DOMAIN.auth0.com');

  constructor(private http: Http, private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('id_token', authResult.id_token);

      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
      });

      this.lock.hide();
    });
  }

  login() {
    this.lock.show();

    // return this.http.post('/api/login', { username: username, password: password })
    //   .map((response: Response) => {
    //     // login successful if there's a jwt token in the response
    //     let user = response.json();
    //     console.log(user);
    //     // if (user && user.token) {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     // }

    //     return user;
    //   });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    this.router.navigateByUrl('/login');
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
