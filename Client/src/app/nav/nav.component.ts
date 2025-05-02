import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent   implements OnInit {
  
  form = new FormGroup({
    userName : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    password : new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(20)])
  })

  constructor( ){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(){
    console.log(this.form.value);
    
  }

}
