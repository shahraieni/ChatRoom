import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../_models/account';
@Injectable({
  providedIn:'root',
})

export class  AuthGuard implements CanActivate{
  constructor( private accountService:AccountService , private toast:ToastrService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return  this.accountService.currentUser$.pipe(
            take(1),
            map((user:IUser) =>{
              if(user) return true;
              this.toast.error("ابتدا وارد سایت شوید" , "خطا");
              this.router.navigateByUrl('/');
              return false;
            })
        )
  }

}

