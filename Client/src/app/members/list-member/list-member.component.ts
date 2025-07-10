import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender, IMember, OrderBy, TypeSort, UserParams } from 'src/app/_model/member';
import { IPagination, PaginatedResult } from 'src/app/_model/pagination';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css']
})
export class ListMemberComponent  implements OnInit {

  userParams = new UserParams();
 result:PaginatedResult<IMember[]>;
 genders = Gender;
 orderby = OrderBy;
 typeSort = TypeSort;

  constructor(private memberService:MemberService){}

  ngOnInit(): void {
    this.loadMembers();
  }
  ngSubmit(){
    this.loadMembers();
    
  }
  onClear(){
    this.userParams = new UserParams();
     this.loadMembers();
  }

  pageChanged(event :any):void{

    this.userParams.pageNumber = event.page;
     this.loadMembers();

  }
  private loadMembers(){
       this.memberService.getMembers(this.userParams).subscribe((res)=>{
      this.result = res;
     

     })

  }

  }


