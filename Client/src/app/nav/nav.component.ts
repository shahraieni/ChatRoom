import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService, IRequestLogin } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent   implements OnInit {
  loggedIn = false
  form = new FormGroup({
    userName : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    password : new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(20)])
  })

  constructor(private accountService: AccountService ){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return
    }

    this.accountService.login(this.form.value  as IRequestLogin).subscribe(user=>{
      if(user){
        this.loggedIn = true;
      }
        
      })
    }
  
      logout(){
        this.loggedIn = false;
      }
      

}
