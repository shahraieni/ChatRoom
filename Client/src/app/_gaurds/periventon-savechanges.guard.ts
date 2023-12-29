import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface IPeriventUnSavechanges{
  canActivate():Observable<boolean> | boolean
}

@Injectable({
  providedIn: 'root'
})
export class PeriventonSavechangesGuard implements CanDeactivate<IPeriventUnSavechanges> {
  canDeactivate(
    component: IPeriventUnSavechanges,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot):
     Observable<boolean> | boolean {
    return component.canActivate();
  }
  
}
