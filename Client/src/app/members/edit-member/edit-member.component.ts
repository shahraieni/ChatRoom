import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
import { IPreventUnsavedChanges } from 'src/app/_guards/prevent-unsaved-chenges.guard';
import { User } from 'src/app/_model/account';
import { IMember } from 'src/app/_model/member';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent  implements OnInit , IPreventUnsavedChanges{
  errors = [];
  user :User;
  member:IMember;
  form :FormGroup;
  isSubmit = false

  constructor(
    private accountService:AccountService ,
    private memberService:MemberService,
    private toast : ToastrService
  ){}


  canDeactivate(): Observable<boolean> | boolean {
    return this.form.dirty ? confirm("تغییرات را ذخیره نکرده اید میخواهید خارج شوید ؟") : true;
  }
  ngOnInit(): void {
   this.loadUser();
   this.loadMember();
  }

  loadMember(){
    this.memberService.getMemberByUserName(this.user.userName).subscribe(member=>{
      this.member = member;
      // console.log(member);
      
      this.form = new FormGroup({
        city: new FormControl(member.city),
        country: new FormControl(member.country),
        knownAs: new FormControl(member.knownAs),
        dateOfBirth: new FormControl(member.dateOfBirth),
        email: new FormControl(member.email , [Validators.required ,Validators.email]),
        interests: new FormControl(member.interests),
        lookingFor: new FormControl(member.lookingFor),
        introduction: new FormControl(member.introduction),
      })
    })
  };
  loadUser(){
      this.accountService.currentUser$.subscribe((user)=>{
        this.user = user;
      })

  };

  onSubmit(){
    

      if(!this.form.valid){
        this.form.markAllAsTouched();
        return;
      }
      this.isSubmit = true;
      this.memberService.updateMember(this.form.value).pipe(finalize(()=>{
        this.isSubmit = false;
      })).subscribe((member)=>{

        this.member = member;
        this.toast.success("Update Member Success")
      
      }
    )
  }

}
