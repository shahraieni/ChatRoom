import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IPeriventUnSavechanges } from 'src/app/_gaurds/periventon-savechanges.guard';
import { IMember } from 'src/app/_models/Member';
import { User } from 'src/app/_models/account';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent  implements OnInit , IPeriventUnSavechanges{
  errors =[];

  user:User;
  member:IMember;

  form:FormGroup

  constructor(private accontservice: AccountService , private memberservice:MemberService ,private toasr: ToastrService){}
  canActivate(): boolean | Observable<boolean> {
   return this.form.dirty ? confirm("تغییرات را ذخیره نکرده اید ایا میخواهید خارج شوید؟"):true
  }

  ngOnInit(): void {

    this.loadeUser();
    this.loadeMember();
  }

  onsubmit(){
    
    this.memberservice.updateMember(this.form.value).subscribe(member=>{
      this.errors=[];
      this.member = member;
      this.toasr.success('Update Member Success');
      console.log("llll",member)
    },error=>{
      this.errors= error;
    }
    )
  }

    loadeMember(){
      this.memberservice.getMemberByUserName(this.user.userName).subscribe(member=>{
        this.member = member;
        this.form =new FormGroup({
          city : new FormControl(member.city),
          country: new FormControl(member.country),
          knowAs:new FormControl(member.knownAs),
          dateOfBirth:new FormControl(member.dateOfBirth),
          email:new FormControl(member.email,[Validators.required,Validators.required]),
          interests:  new FormControl(member.interests),
          lookingFor: new FormControl(member.lookingFor),
          introduction:new FormControl(member.introduction)

        })
      })
    }
    loadeUser(){

      this.accontservice.currenUser$.subscribe((user)=>{
        this.user = user;
      })
    }

}
