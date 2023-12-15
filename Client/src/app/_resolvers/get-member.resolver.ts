import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MemberService } from '../_services/member.service';
import { IMember } from '../_models/Member';

@Injectable({
  providedIn: 'root'
})
export class GetMemberResolver implements Resolve<IMember> {
  constructor(private memberservice:MemberService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMember> {
    return this.memberservice.getMemberByUserName(route.params['username'])
  }
}
