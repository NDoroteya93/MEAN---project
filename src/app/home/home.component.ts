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

    console.log(this.decodedJwt);

    this.userService.getCurrentUser()
      .subscribe(
      data => {
        console.log(data);
        this.currentUser = data;
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:eofline
}