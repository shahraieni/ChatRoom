import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';
import { IRequestLogin, IRequestRegister, User } from '../_model/account';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = "https://localhost:5001/api";
  private currentuser =  new ReplaySubject<User>(1);

  currentUser$  = this.currentuser.asObservable();

  constructor(private _http:HttpClient) { }

  login( login : IRequestLogin ){
    return     this._http.post<User>(`${this.baseUrl}/account/login`,login).pipe(
      map((response : User)=>{
        if(response.userName && response.token){
          localStorage.setItem("user",JSON.stringify(response));
          this.currentuser.next(response);
        }
        
      })
    )
  }
  setcurrentUser(user :User){
    this.currentuser.next(user);
    
  }


  register(rejecter:IRequestRegister){
    return   this._http.post<User>(`${this.baseUrl}/account/register`,rejecter).pipe(
      map((response : User)=>{
        if(response.userName && response.token){
          localStorage.setItem("user",JSON.stringify(response));
          this.currentuser.next(response);
        }

        return response;
        
      })
    )
  
}

  logout(){
    localStorage.removeItem("user");
    this.currentuser.next(null);
  }
}
