import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  implements OnInit {
loggedIn =false
form = new FormGroup({
  userName : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  password : new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(20)])
})
  constructor(private accountService:AccountService ){}
  ngOnInit(): void { 
    this.getCurrencyUser()
  }

  onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.accountService.login(this.form.value).subscribe((user :any)=>{
        
          this.loggedIn = true;
       
      });
    
    console.log(this.loggedIn);
  }

  getCurrencyUser(){
      this.accountService.currentUser$.subscribe(user=>{
        this.loggedIn = !! user;
      })
  }

  logout(){
    this.accountService.logout();
    this.loggedIn = false;
  }

}
