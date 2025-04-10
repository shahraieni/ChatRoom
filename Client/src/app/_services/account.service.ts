import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';

export interface IRequestLogin{
     userName:string ;
    password:string
}

export interface IRequestRejecter{
  userName:string ;
 password:string
}

export interface IUser{
  userName:string ;
  token:string
}


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = "https://localhost:5001/api";
  private currentUser = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http:HttpClient) { }
    //TODO
  register(rejecter:any){
      return this.http.post<IUser>(`${this.baseUrl}/account/register`,rejecter).pipe(
        map((response:IUser)=>{
          if(response.userName && response.token){
            localStorage.setItem('user',JSON.stringify(response));
            this.currentUser.next(response)
          }
          return response;
        })
      )
  }


  login(login : any){
    return  this.http.post<IUser>(`${this.baseUrl}/account/login` , login).pipe(
      map((response:IUser)=>{
        if(response.userName && response.token){
          localStorage.setItem('user',JSON.stringify(response));
          this.currentUser.next(response)
        }
      })
    );
  }

    setCurrentUser(user : IUser){
        this.currentUser.next(user);
    }

    logout(){
      localStorage.removeItem('user');
      this.currentUser.next(null);
    };
}
