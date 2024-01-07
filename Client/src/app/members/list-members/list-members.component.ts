import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.css']
})
export class ListMembersComponent  implements OnInit {
Members$=  new Observable<IMember[]> ;
  constructor( private   memberservice:MemberService){}

  ngOnInit(): void {
    this.Members$ = this.memberservice.getMembers();
   
  }


}
