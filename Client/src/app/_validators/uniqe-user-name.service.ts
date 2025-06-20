import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors, Validator, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniqueUserNameService  implements AsyncValidator{


  constructor( private accentService :AccountService ) { }
  validate(control: AbstractControl): Promise<ValidationErrors > | Observable<ValidationErrors > {
     return  control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value)=>{
        return this.accentService.isExistUserName(value)
      }), 
      map((res)=>{
          if(!!res) control.setErrors({uniqueUserName: true})
            return null;
      }),
      catchError((error)=>{
        return null;
      })
     )
  }

 
  
  
}
