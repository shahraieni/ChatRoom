import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { IMember } from 'src/app/_model/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-card-shared',
  templateUrl: './member-card-shared.component.html',
  styleUrls: ['./member-card-shared.component.css']
})
export class MemberCardSharedComponent   implements OnInit {

@Input() member : IMember

  constructor(private memberService:MemberService  , private toast :ToastrService){}
 
   ngOnInit(): void { }
 
   AddLike(){
     this.memberService.addLike(this.member.userName).subscribe(()=>{
         this.toast.success('user like' + this.member.userName)
     })
   }

}
