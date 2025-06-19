import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IMember, IMemberUpdate, Photo } from '../_model/member';
import { map, of, tap } from 'rxjs';




@Injectable({
  providedIn: 'root'
})



export class MemberService {

  private baseUrl= environment.baseUrl;
  private members:IMember[] = [];

  constructor(private http:HttpClient) { }


  getMembers(){
    if(this.members.length > 0) return of(this.members);

    return   this.http.get<IMember[]>(`${this.baseUrl}/users/getAllUsers`).pipe(
      tap((members)=>{
        this.members = members
      }))
  }

  getMemberByUserName(userName :string){

    const member = this.members.find((x)=>x.userName === userName);
    if(member !== undefined) return of(member)

    return this.http.get<IMember>(`${this.baseUrl}/users/getUserByUserName/${userName}`);

  }

  getUserNameById(id :number){

    const member = this.members.find((x)=>x.id === id);
    if(member !== undefined) return of(member)

    return this.http.get<IMember>(`${this.baseUrl}/users/getUserById/${id}`);
  }

   deletePhoto(photoId: number) {
    return this.http.delete<Photo>(
      `${this.baseUrl}/users/deletePhoto/${photoId}`
    );
  }

  updateMember(memberUpdate :IMemberUpdate){
    
      return  this.http.put<IMember>(`${this.baseUrl}/users/UpdateUser`,memberUpdate).pipe(
        map(member=>{
          const index = this.members.findIndex(x=>x.id === member.id);

          this.members[index] = member;
          return member
      }));

  }

  setMainPhoto(photoId :number){
     return this.http.put<Photo>(`${this.baseUrl}/users/setMainPhoto/${photoId}` , {})
  }
}
