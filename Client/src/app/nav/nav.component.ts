import { AccountService, User } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  implements OnInit{

        currenUser$:Observable<User>;

        constructor(private accountService:AccountService){}

        ngOnInit(): void {

            this.currenUser$ = this.accountService.currenUser$;
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

            },
            (error)=> {console.log(error);

            }

          );

        }
        logout(){
          this.accountService.logout();

        }

  }
