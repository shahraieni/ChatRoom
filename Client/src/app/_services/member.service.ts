import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IMember, IMemberUpdate, Photo, UserParams } from '../_model/member';
import { map, of, tap } from 'rxjs';
import { PaginatedResult } from '../_model/pagination';




@Injectable({
  providedIn: 'root'
})



export class MemberService {

  private baseUrl= environment.baseUrl;
  private members:IMember[] = [];
  paginationResult:PaginatedResult<IMember[]> = new PaginatedResult<IMember[]>();

  constructor(private http:HttpClient) { }


  getMembers(userParams: UserParams ) {

    // if(this.members.length > 0) return of(this.members);
    let params = this.setParams(userParams);

    return   this.http.get<PaginatedResult<IMember[]>>(`${this.baseUrl}/users/getAllUsers`,{params})
    .pipe(
      map((res)=>{
        console.log(res);
        this.members = res.items;
        this.paginationResult = res;
        return res;
        
      })
    )
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

  private setParams(userParams :UserParams){
    let params = new HttpParams();

      if(userParams.pageNumber !== null && userParams.pageSize !== null){
      params = params.append("pageNumber" , userParams.pageNumber.toString());
      params = params.append("pageSize" , userParams.pageSize.toString());
      params = params.append("minAge" , userParams.minAge.toString());
      params = params.append("maxAge" , userParams.maxAge.toString());
      params = params.append("gender" , userParams.gender.toString());
      params = params.append("orderBy" , userParams.orderBy.toString());
      params = params.append("typeSort" , userParams.typeSort.toString());
      }
      return params;

  }
}
