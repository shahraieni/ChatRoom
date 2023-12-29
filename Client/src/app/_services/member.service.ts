import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMember, IMemberUpdate } from '../_models/Member';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MemberService {
private BaseUrl = environment.basUrl;
private members: IMember[] = [];
  constructor(private http: HttpClient) { }

  getMembers(){
    return    this.http.get<IMember[]>(`${this.BaseUrl}/Users/GetAllUsers`);
   // return this.http.get<IMember>(`${this.baseUrl}/users`);

  }
  getMemberByUserName(userName:String){
    return this.http.get<IMember>(`${this.BaseUrl}/users/getUserByUserName/${userName}`)

  }
  getMemberById(id:number){
    return this.http.get<IMember>(`${this.BaseUrl}/users/getUserUserById/${id}`)

  }
  updateMember(memberUpdate: IMemberUpdate) {
    return this.http
      .put<IMember>(`${this.BaseUrl}/users/UpdateUser`, memberUpdate)
      .pipe(
        map((member) => {
          const index = this.members.findIndex((x) => x.id === member.id);
          this.members[index] = member;
          return member;
        })
      );
  }
  updatemember(memberupdate:IMemberUpdate){
    return this.http.put(`${this.BaseUrl}/users/UpdateUser`,memberupdate)
  }

}

