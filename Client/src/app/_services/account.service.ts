import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
private basUrl = 'https://localhost:5001/api'
  constructor(private http:HttpClient) { }

 Login(login:IRequstLogin){
    return this.http.post<User>(`${this.basUrl}/account/login`,login)
  }
}
