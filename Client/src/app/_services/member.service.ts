import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMember } from '../_models/Member';



@Injectable({
  providedIn: 'root'
})
export class MemberService {
private BaseUrl = environment.basUrl;
  constructor(private http: HttpClient) { }

  getMembers(){
    return    this.http.get<IMember[]>(`${this.BaseUrl}/Users`);
   // return this.http.get<IMember>(`${this.baseUrl}/users`);

  }
  getMemberByUserName(userName:String){
    return this.http.get<IMember>(`${this.BaseUrl}/users/getUserByUserName/${userName}`)

  }
  getMemberById(id:number){
    return this.http.get<IMember>(`${this.BaseUrl}/users/getUserUserById/${id}`)

  }

}

