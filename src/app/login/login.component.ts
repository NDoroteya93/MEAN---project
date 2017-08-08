import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';

import { contentHeaders } from '../_helpers/headers';
import { AuthService } from '../core/service/auth.service';
import { ApiService } from '../core/service/api.service';

import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  complexForm: FormGroup;
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {

    // reset login status
    // this.auth.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    let user = new User({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });

    this.complexForm = fb.group(user);
  }



  login(value: any): void {
    this.api.post('auth', value)
      .subscribe(data => {
        console.log(data);
        this.auth.setToken(data.token);
        this.router.navigate(['home']);
      });

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


  // ngOnInit() {
  // }



}
