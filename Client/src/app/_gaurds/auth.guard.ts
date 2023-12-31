import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private AccountService:AccountService,private toast:ToastrService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean | UrlTree {
    return this.AccountService.currenUser$.pipe(
      take(1),
      map((user)=>{
        if(user)
        return true
        this.toast.error("ابتدا باید وارد سایت شوید","خطا")
        return false;

      }
      ))
  }

}
function tak(arg0: number): import("rxjs").OperatorFunction<import("../_models/account").User, unknown> {
  throw new Error('Function not implemented.');
}

