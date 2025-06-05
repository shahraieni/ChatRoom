import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _router:Router , private _tost:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
       

          if(error){
            switch (error.status) {
              case 404:
                this._router.navigateByUrl("not-found");
                break;

                case 400:
                  if(error.error.errors){
                    let errorlist = error.error.errors
                    const modelStateErrors :string[]= [];

                    for (const key in errorlist) {
                      if (errorlist[key]) {
                        modelStateErrors.push(errorlist[key])
                        
                      }
                    }
                    throw modelStateErrors
                  }else{
                    this._tost.error(error.error.message , 'کد خطا :' + error.status)
                  }
                  break;
                case 500:
                this._tost.error("خطایی در سمت سرور رخ داده است","کد خطا:"+ error.status.toString())
                break;
            
              default:
                this._tost.error(error.error.message , 'کد خطا :' + error.status)
                break;
            }
          }
        return throwError(error)
      })
    );
  }
}
