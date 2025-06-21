import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRequestRegister } from '../_model/account';
import { MatchPasswordService } from '../_validators/match-password.service';
import { UniqueUserNameService } from '../_validators/uniqe-user-name.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent   implements OnInit  {

@Output() close  = new EventEmitter();
bsConfig: Partial<BsDatepickerConfig>;
  maxDate: Date = new Date(); // 2021
   constructor(
    private accountService : AccountService  ,
    private router : Router ,
    private toast: ToastrService,
    private matchPassword :MatchPasswordService,
    private uniqUseName : UniqueUserNameService
    ){
       this.configDate();
    }

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
      knownAs: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('0', [Validators.required]), //radio select option
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

    private configDate() {
    this.bsConfig = Object.assign(
      {},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY',
        Animation: 'true',
      }
    );
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); //2021-18 = 2003
  }


  ngOnInit(): void {
   
  }


  onSubmit() {
    debugger
    this.accountService.register(this.form.value ).subscribe((user) => {
   
       this.router.navigateByUrl("/members");
       this.toast.success("ورود شما با موفقیت انجام شد ","موفقیت")

      
    });
  }

  cancel(){
       this.close.emit();
  }

}
