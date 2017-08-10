import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ApiService } from '../core/service/api/api.service';
import { AlertService } from '../core/service/alert';

import { User } from '../_models';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    fb: FormBuilder
  ) { 

    
    const user = new User({
      'password': [null, Validators.required],
      'confirmPassword': [null, Validators.required]
    });
    this.passwordForm = fb.group(user);
  }

  ngOnInit() {
  }

  save(model: User, isValid: boolean) {
        console.log(model, isValid);
    }

}
