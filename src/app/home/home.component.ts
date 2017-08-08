import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor() {
    // this.currentUser = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
  }

}