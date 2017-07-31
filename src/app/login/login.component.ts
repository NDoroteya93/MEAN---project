import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthenticationService } from '../core/service/authentication.service';

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
    private authenticationService: AuthenticationService
  ) {

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    let user = new User({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'firstName': [null],
      'lastName': [null],
    });

    this.complexForm = fb.group(user);
  }



  submitForm(value: any): void {
    console.log(value);
    // this.userService.addCar(value);
    this.loading = true;
    this.authenticationService.login(value.username, value.password)
    this.router.navigate(['/dashboard']);
  }


  ngOnInit() {
  }



}
