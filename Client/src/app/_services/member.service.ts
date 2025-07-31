import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IMember, IMemberUpdate, Photo, UserParams } from '../_model/member';
import { map, Observable, of, tap } from 'rxjs';
import { PaginatedResult } from '../_model/pagination';
import { PredicateLikeEnum, UserLikeParams } from '../_enums/LikeUser';

@Injectable({
  providedIn: 'root'
})



export class MemberService {

  private baseUrl= environment.baseUrl;
  private cacheMember = new Map<string , PaginatedResult<IMember[]>> ();
  private members:IMember[] = [];
  private userParams  :UserParams = new UserParams();
  paginationResult:PaginatedResult<IMember[]> = new PaginatedResult<IMember[]>();

  constructor(private http:HttpClient) { }


  getMembers(userParams: UserParams ) : Observable<PaginatedResult<IMember[]>> {
  const key = Object.values(userParams).join('-')
   let response = this.cacheMember.get(key);
  
   
   if(response && response !=null) return of(response);
    let params = this.setParams(userParams);

    return   this.http.get<PaginatedResult<IMember[]>>(`${this.baseUrl}/users/getAllUsers`,{params})
    .pipe(
      map((res)=>{
        this.members = res.items;
        this.paginationResult = res;
        this.cacheMember.set(key, res);
        return res;
        
      })
    )
  }

  getMemberByUserName(userName :string){

    let user = [...this.cacheMember]
    .reduce((arr , [key , value]) => arr.concat(value.items),[])
    .find((x)=>x.userName === userName);
    if(user)return of(user);

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


  addLike(targetUserName:string){
    const params = new HttpParams().append('targetUserName' , targetUserName);
    return this.http.post(`${this.baseUrl}/UserLike/Add-Like`, {}, {params});
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

  setUserParams(userParams :UserParams){
      this.userParams = userParams;
  }
  getUserParams(){
    return this.userParams;
  }

  getUserLike( userLikeParams : UserLikeParams ){
    let params = new HttpParams();
    params = params.append('PageNumber' , userLikeParams.pageNumber);
    params = params.append('PageSize' , userLikeParams.pageSize);
    params = params.append('PredicateUserLike' , userLikeParams.predicateUserLike.toString());
      return this.http.get<PaginatedResult<IMember[]>>(`${this.baseUrl}/UserLike/get-likes`,{params})
  }
  resetUserParams(){
    this.userParams = new UserParams();
    return this.userParams;
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
