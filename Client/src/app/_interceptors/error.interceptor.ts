import { MessagesModule } from './../messages/messages.module';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( public router:Router , private toast:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error :HttpErrorResponse)=>{
        if(error){
          switch (error.status){
            case 404:
             this.router.navigateByUrl('Not-Found')
             break;
             case 400:
              if(error.error.errors)
              {
                const modelstaseError:string[] = [];
                for(const key in error.error.errors )
                {
                  if(error.error.errors[key])
                  {
                    modelstaseError.push(error.error.errors[key])
                  }
                }

                throw modelstaseError

              }else{
                this.toast.error( error.error.message , "کد خطا:" + error.status.toString())
              }
             break;
             case 500 :
              this.toast.error( 'خطایی در سمت سرور رخ داده است لطفا مجددا تلاش کنید' , "کد خطا:" + error.status.toString())
              break;
             default:
              this.toast.error( error.error.message , "کد خطا:" + error.status.toString())
             break;
          }
        }


        return throwError(error)
      })
    );
  }
}
