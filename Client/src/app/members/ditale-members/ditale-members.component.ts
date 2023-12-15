import { MemberService } from './../../_services/member.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMember } from 'src/app/_models/Member';

@Component({
  selector: 'app-ditale-members',
  templateUrl: './ditale-members.component.html',
  styleUrls: ['./ditale-members.component.css']
})
export class DitaleMembersComponent  implements OnInit {

  member:IMember;
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
    this.member = this.route.snapshot.data['member'] as IMember
  }

}
