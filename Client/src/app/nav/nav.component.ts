import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/account';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  implements OnInit{

        currenUser$:Observable<User>;

        constructor(private accountService:AccountService, private router:Router , private toastr:ToastrService){}

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
            (user)=>{

              this.router.navigateByUrl("/members");
              this.toastr.success(" شما با موفقیت وارد حساب کاربری شدید ","موفقیت")

            },
            // (error:any)=> {

            //   console.log(error);
            //   this.toastr.error(error.error.message)

            // }

          );

        }
        logout(){
          this.accountService.logout();
          this.toastr.info("خروج با موفقیت انجام شد","موفقیت")
          this.router.navigateByUrl("/")

        }

  }
