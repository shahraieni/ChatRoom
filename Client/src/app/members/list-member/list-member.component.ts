import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMember } from 'src/app/_model/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css']
})
export class ListMemberComponent  implements OnInit {

  
  member$ = new Observable<IMember[]>();

  constructor(private memberService:MemberService){}

  ngOnInit(): void {
    this.member$ = this.memberService.getMembers();
  
  }

  }


