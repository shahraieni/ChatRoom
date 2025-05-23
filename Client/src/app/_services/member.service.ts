import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IMember } from '../_model/member';

const httpHeader = new HttpHeaders().set('Authorization','Bearer ' + JSON.parse(localStorage.getItem('user'))?.token);


@Injectable({
  providedIn: 'root'
})



export class MemberService {

  private baseUrl= environment.baseUrl;

  constructor(private http:HttpClient) { }


  getMembers(){
    return   this.http.get<IMember[]>(`${this.baseUrl}/users`)
  }

  getMemberByUserName(userName :string){

    return this.http.get<IMember>(`${this.baseUrl}/users/getUserByUserName/${userName}`,{headers:httpHeader});

  }

  getUserNameById(id :number){
    return this.http.get<IMember>(`${this.baseUrl}/users/getUserById/${id}`,{headers:httpHeader});
  }
}
