import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRequstLogin, IRequstRegister, User } from '../_models/account';




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

      register(regester: IRequstRegister){
        return this.http.post<User>(`${this.basUrl}/account/register`,regester).pipe(
          map((respanse:User)=>{
              if(respanse.userName && respanse.token){
                localStorage.setItem('user',JSON.stringify(respanse))
              }
              this.currenUser.next(respanse)
              return respanse;

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
