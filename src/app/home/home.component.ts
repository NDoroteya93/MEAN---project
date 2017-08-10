import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { UserService } from '../core/service/user';

import { User } from '../_models/index';


@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  jwtHelper: JwtHelper = new JwtHelper();
  jwt: string;
  decodedJwt: string;
  jwtDate: any;
  jwtExpired;

  constructor(
    public router: Router,
    public authHttp: AuthHttp,
    private userService: UserService
  ) {

    this.jwt = localStorage.getItem('labs-token');
    this.decodedJwt = this.jwtHelper.decodeToken(this.jwt);
    this.jwtDate = this.jwtHelper.getTokenExpirationDate(this.jwt);
    this.jwtExpired = this.jwtHelper.isTokenExpired(this.jwt);
  }

  ngOnInit() {
  }

  getUsers(e): void {
    this.userService.getCurrentUser()
      .subscribe(
      data => {
        // this.router.navigate(['home']);
      },
      error => {
        // this.alert.error(error.error);
        console.log(error);
      }
      );
  }
  // tslint:disable-next-line:eofline
}