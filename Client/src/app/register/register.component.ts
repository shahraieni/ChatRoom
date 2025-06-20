import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRequestRegister } from '../_model/account';
import { MatchPasswordService } from '../_validators/match-password.service';
import { UniqueUserNameService } from '../_validators/uniqe-user-name.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent   implements OnInit  {

@Output() close  = new EventEmitter()
   constructor(
    private accountService : AccountService  ,
    private router : Router ,
    private toast: ToastrService,
    private matchPassword :MatchPasswordService,
    private uniqUseName : UniqueUserNameService
    ){}

  form = new FormGroup(
    {
      userName: new FormControl( '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],[this.uniqUseName.validate.bind(this.uniqUseName)]),
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
    },{validators : [this.matchPassword.validate.bind(this.matchPassword)]}
  )



  showValidatorForMatchPassword(){

    return (
      this.form.dirty && 
      this.form.get('password').touched &&
      this.form.get('passwordConfirm').touched &&
      this.form.get('password').dirty &&
      this.form.get('passwordConfirm').dirty &&
      this.form.errors
    );

  }


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
