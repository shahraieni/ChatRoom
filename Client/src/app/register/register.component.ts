import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRequestRegister } from '../_model/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent   implements OnInit  {

@Output() close  = new EventEmitter()
   constructor(private accountService : AccountService  , private router : Router , private toast: ToastrService){}

  form = new FormGroup(
    {
      userName: new FormControl( '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
       
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
    //   knownAs: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(3),
    //     Validators.maxLength(20),
    //   ]),
    //   city: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(3),
    //     Validators.maxLength(20),
    //   ]),
    //   country: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(3),
    //     Validators.maxLength(20),
    //   ]),
    //   dateOfBirth: new FormControl('', [Validators.required]),
    //   gender: new FormControl('0', [Validators.required]), //radio select option
    },
  )






  ngOnInit(): void {
   
  }


  onSubmit() {
    debugger
    this.accountService.register(this.form.value  as IRequestRegister).subscribe((user) => {
   
       this.router.navigateByUrl("/members");
       this.toast.success("ورود شما با موفقیت انجام شد ","موفقیت")

      
    });
  }

  cancel(){
       this.close.emit();
  }

}
