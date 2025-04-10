import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{

@Output() close = new EventEmitter();
  constructor(private accountService :AccountService) {}
  ngOnInit(): void {
 
  }
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

  onSubmit() {
    this.accountService.register(this.form.value).subscribe((user) => {
      console.log(user);
      
    });
  }

  cancel(){
        this.close.emit();
  }
}
