import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  implements OnInit{

        loggedIn = false;

        constructor(private accountService:AccountService){}

        ngOnInit(): void {
            this.getCurrenUser();
        }
          form = new FormGroup({
          userName : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
          password :new FormControl('',[Validators.required , Validators.minLength(5),Validators.maxLength(15)])
        })
        onSubmit(){
          if(this.form.invalid){
            this.form.markAllAsTouched();
            return;
          }
          this.accountService.Login(this.form.getRawValue()).subscribe(
            (user)=>{ console.log(user);
              this.loggedIn =true;
            },
            (error)=> {console.log(error);
              this.loggedIn = false;
            }

          );

        }
        logout(){
          this.accountService.logout();
          this.loggedIn = false;
        }
        getCurrenUser(){
          this.accountService.currenUser$.subscribe(
            (user)=>{
              this.loggedIn =!!user
            },
          (error)=>{
            this.loggedIn = false;
            console.log(error)
          }
          )
        }
  }
