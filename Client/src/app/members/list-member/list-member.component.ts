import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMember } from 'src/app/_model/member';
import { IPagination, PaginatedResult } from 'src/app/_model/pagination';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css']
})
export class ListMemberComponent  implements OnInit {

  
 result:PaginatedResult<IMember[]>
  pageNumber = 1;
  pageSize = 6;

  constructor(private memberService:MemberService){}

  ngOnInit(): void {
    this.loadMembers();
  }

  pageChanged(event :any):void{

    this.pageNumber = event.page;
     this.loadMembers();

  }
  private loadMembers(){
       this.memberService.getMembers(this.pageNumber,this.pageSize).subscribe((res)=>{
      this.result = res;
     

     })

  }

  }


