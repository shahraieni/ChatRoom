import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';
import { IRequestLogin, IRequestRegister, User } from '../_model/account';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
    private baseUrl= environment.baseUrl;
  private currentuser =  new ReplaySubject<User>(1);

  currentUser$  = this.currentuser.asObservable();

  constructor(private _http:HttpClient) { }

  login( login : IRequestLogin ){
    return   this._http.post<User>(`${this.baseUrl}/account/login`,login).pipe(
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


  register(rejecter:any){
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

    isExistUserName(userName : string){
       return   this._http.get<boolean>(`${this.baseUrl}/account/IsExistUserName/${userName}`,)
    }

  logout(){
    localStorage.removeItem("user");
    this.currentuser.next(null);
  }
}
