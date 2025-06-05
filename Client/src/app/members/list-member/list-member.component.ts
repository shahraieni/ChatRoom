import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/_model/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css']
})
export class ListMemberComponent  implements OnInit {

  members:IMember[]=[];

  constructor(private memberService:MemberService){}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers().subscribe(members=>{
         
          this.members = members
    } )
     
      
    
  }

}
