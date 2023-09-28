import {  AccountService } from './_services/account.service'
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = 'Client';

  constructor(private accountService:AccountService){}
  ngOnInit(): void {
    this.SetCurrenUser();
  }

  SetCurrenUser(){
    const user:User = JSON.parse(localStorage.getItem('user'));
    this.accountService.SetcurrenUser(user);
  }
}
