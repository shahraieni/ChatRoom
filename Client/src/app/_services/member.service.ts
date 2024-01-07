import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMember, IMemberUpdate } from '../_models/Member';
import { map, of, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MemberService {
private BaseUrl = environment.basUrl;
private members: IMember[] = [];
  constructor(private http: HttpClient) { }

  getMembers(){
    if(this.members.length>0) return of(this.members);
    return    this.http.get<IMember[]>(`${this.BaseUrl}/Users/GetAllUsers`).pipe(tap(member=>{
      this.members = member
    }));
   // return this.http.get<IMember>(`${this.baseUrl}/users`);

  }
  getMemberByUserName(userName:String){
    const member = this.members.find(x=>x.userName == userName);
    if(member!= undefined)return of(member)
    return this.http.get<IMember>(`${this.BaseUrl}/users/getUserByUserName/${userName}`)

  }
  getMemberById(id:number){
    const member = this.members.find(x=>x.id == id);
    if(member!= undefined)return of(member)
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

