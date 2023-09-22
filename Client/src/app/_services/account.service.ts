import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IRequstLogin{
  userName:string;
  password:string;
}

export interface User{
  userName:string;
  token:string

}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    private basUrl = 'https://localhost:5001/api';
    private currenUser = new ReplaySubject<User>(1);

    currenUser$ = this.currenUser.asObservable();


      constructor(private http:HttpClient) { }

     Login(login:IRequstLogin){
        return this.http.post<User>(`${this.basUrl}/account/login`,login).pipe(
          map((respanse:User)=>{
              if(respanse.userName && respanse.token){
                localStorage.setItem('user',JSON.stringify(respanse))
              }
              this.currenUser.next(respanse)

          })
        )
      }
   SetcurrenUser(user:User){
      this.currenUser.next(user)
   }

   logout(){
    localStorage.removeItem('user')
    this.currenUser.next(null)
   }
}
