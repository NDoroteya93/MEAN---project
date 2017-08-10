import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';

import { contentHeaders } from '../_helpers';
import { AuthService } from '../core/service/auth/auth.service';
import { ApiService } from '../core/service/api/api.service';
import { AlertService } from '../core/service/alert';

import { User } from '../_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  complexForm: FormGroup;
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    fb: FormBuilder
  ) {

    let user = new User({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });

    this.complexForm = fb.group(user);
  }

  ngOnInit() {
    // reset login statuss
    this.auth.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }



  login(value: any): void {
    this.loading = true;
    this.api.post('auth', JSON.stringify(value))
      .subscribe(
      data => {
        this.auth.setToken(data.token);
        this.router.navigate(['home']);
      },
      error => {
        this.alert.error(error.error);
        this.loading = false;
      }
      );

    // this.http.post('http://localhost:3005/api/sessions/create', value, { headers: contentHeaders })
    //   .subscribe(
    //   response => {
    //     localStorage.setItem('id_token', response.json().id_token);
    //     this.router.navigate(['home']);
    //   },
    //   error => {
    //     console.log(error);
    //   });
    // // this.userService.addCar(value);
    // this.loading = true;

    // if (!this.auth.loggedIn()) {
    //   this.auth.login();
    // }
  }

  signup() {

  }






}
