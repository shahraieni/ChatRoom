import { Injectable } from '@angular/core';
import { IMessage, MessageParams } from '../_model/message';
import { PaginatedResult } from '../_model/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

   private baseUrl= environment.baseUrl;

    private messageParams  :MessageParams = new MessageParams();

  constructor(private http:HttpClient) { }

  getMassages(messageParams :MessageParams){
    
      
        let params = this.setParams(messageParams);
    
        return   this.http.get<PaginatedResult<IMessage[]>>(`${this.baseUrl}/message`,{params})
        .pipe(
          map((res)=>{
          
            return res;
            
          })
        )
  }

   private setParams(messageParams: MessageParams) {
    let params = new HttpParams();
    if (messageParams.pageNumber !== null && messageParams.pageSize !== null) {
      params = params.append('pageNumber', messageParams.pageNumber.toString());
      params = params.append('pageSize', messageParams.pageSize.toString());
      params = params.append('container', messageParams.container.toString());
    }
    return params;
  }

  getMessageParams(){
    return this.messageParams;
  }

  setMessageParams(messageParams : MessageParams){
    this.messageParams = messageParams;
  } 

  resetMessageParams(){
    this.messageParams = new MessageParams();
  }

  getMessageThread(userName :string){
      return this.http.get<IMessage[]>(`${this.baseUrl}/Message/Thread/${userName}`)
  }
 
}
