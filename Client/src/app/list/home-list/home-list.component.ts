import { Component, OnInit } from '@angular/core';
import { PredicateLikeEnum, UserLikeParams } from 'src/app/_enums/LikeUser';
import { IMember } from 'src/app/_model/member';
import { PaginatedResult } from 'src/app/_model/pagination';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent  implements OnInit {
  result : PaginatedResult<IMember[]>;

  userLikeParams = new UserLikeParams()

  constructor(private memberService :MemberService){}
  ngOnInit(): void {
    this.memberService.getUserLike(this.userLikeParams).subscribe(res=>{
      this.result = res;
      console.log(res);
      
   })
  }

  pageChanged(event:any){
      this.result.currentPage = event?.page;

      this.userLikeParams.pageNumber = event.page;
  }


}
