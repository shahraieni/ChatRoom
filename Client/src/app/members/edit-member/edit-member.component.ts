import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IMember } from 'src/app/_models/Member';
import { User } from 'src/app/_models/account';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent  implements OnInit{

  user:User;
  member:IMember;

  form:FormGroup

  constructor(private accontservice: AccountService , private memberservice:MemberService ){}

  ngOnInit(): void {

    this.loadeUser();
    this.loadeMember();
  }
    loadeMember(){
      this.memberservice.getMemberByUserName(this.user.userName).subscribe(member=>{
        this.member = member;
        this.form =new FormGroup({
          city : new FormControl(member.city),
          country: new FormControl(member.country),
          knowAs:new FormControl(member.knownAs),
          dateOfBirth:new FormControl(member.dateOfBirth)


        })
      })
    }
    loadeUser(){

      this.accontservice.currenUser$.subscribe((user)=>{
        this.user = user;
      })
    }

}
