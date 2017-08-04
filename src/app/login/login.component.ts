import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';

import { contentHeaders } from '../_helpers/headers';
import { AuthService } from '../core/service/auth.service';

import { User } from '../_models/user';

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
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public http: Http,
    private auth: AuthService
  ) {

    // reset login status
    // this.auth.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    let user = new User({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'firstName': [null],
      'lastName': [null],
    });

    this.complexForm = fb.group(user);
  }



  login(value: any): void {
    console.log(value);
    this.http.post('http://localhost:3005/api/sessions/create', value, { headers: contentHeaders })
      .subscribe(
      response => {
        localStorage.setItem('id_token', response.json().id_token);
        this.router.navigate(['home']);
      },
      error => {
        console.log(error);
      });
    // this.userService.addCar(value);
    this.loading = true;

    if (!this.auth.loggedIn()) {
      this.auth.login();
    }
  }

  signup() {

  }


  ngOnInit() {
  }



}
