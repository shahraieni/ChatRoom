import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{

  @Output() close = new EventEmitter;

  constructor(private  accountService:AccountService, public router:Router){}

  form = new FormGroup({
    userName :new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    password : new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
    passwordConfirm :new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(10)])
  })

onSubmit(){
  this.accountService.register(this.form.getRawValue()).subscribe(
    (user)=>
  {
    this.router.navigateByUrl('/members')

  },(error)=>{
    console.log(error);

  })
}
onSubmitRegister(){

}
cancel(){
  this.close.emit()
}

 ngOnInit(): void {

  }


}
