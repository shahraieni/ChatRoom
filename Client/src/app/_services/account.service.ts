import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';

export interface IRequestLogin{
  userName:string;
  password:string;
}

export interface User{
  userName:string;
  token:string;
}

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

  logout(){
    localStorage.removeItem("user");
    this.currentuser.next(null);
  }
}
