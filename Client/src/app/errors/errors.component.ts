import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent {

  constructor(  private http: HttpClient){}
  private baseurl = environment.basUrl;
  validError:string[]=[];

  getNotfound(){

    return this.http.get(this.baseurl + '/Buggy/not-found').subscribe(respanse=>{
     // console.log(respanse);

    },(error)=>{
      //console.log(error);

    });

  }

  getServerError(){

    return this.http.get(this.baseurl + '/Buggy/server-error').subscribe(respanse=>{
     // console.log(respanse);

    },(error)=>{
     // console.log(error);

    });

  }
  getBadrequst(){

    return this.http.get(this.baseurl + '/Buggy/bad-request').subscribe(respanse=>{
      //console.log(respanse);

    },(error)=>{
      //console.log(error);

    });

  }
  getVlidtorError(){

    return this.http.get(this.baseurl + '/Buggy/not-found/one').subscribe(respanse=>{
      //console.log(respanse);

    },(error)=>{
      //console.log(error);

    });

  }
  getValidationErrorRegister() {
    return this.http.post(`${this.baseurl}/account/register`, {}).subscribe(
      (response) => {
       //  console.log(response);
      },
      (error) => {
       // console.log(error.error.errors);
        this.validError=error.error.errors
      }
    );
  }

}
