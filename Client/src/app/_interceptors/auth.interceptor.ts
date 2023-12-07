import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpEventType
} from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { User } from '../_models/account';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  currnUser:User;
  constructor(private accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.currenUser$.pipe(take(1)).subscribe((user)=>{
      this.currnUser = user;

    });
    if(this.currnUser){
      request = request.clone({headers : new HttpHeaders().set('Authorization',
      'Bearer ' + this.currnUser.token)
    })
    }
    return next.handle(request).pipe(tap((event)=>{
      console.log(event)
      if(event.type === HttpEventType.Sent){
        console.log("reguest sent")
      }
      if(event.type === HttpEventType.Response){
        console.log("Response")
        const token = event?.body?.token;

        if(token){
          localStorage.setItem('user' , JSON.stringify(event.body))
        }
      }

    }));
  }
}
