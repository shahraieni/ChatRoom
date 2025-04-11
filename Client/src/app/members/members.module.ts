import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersRoutingModule } from './members-routing.module';
import { ListMemberComponent } from './list-member/list-member.component';
import { DetailMemberComponent } from './detail-member/detail-member.component';
import { HomeMemberComponent } from './home-member/home-member.component';


@NgModule({
  declarations: [
    ListMemberComponent,
    DetailMemberComponent,
    HomeMemberComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule
  ]
})
export class MembersModule { }
