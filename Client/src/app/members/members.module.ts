import { DitaleMembersComponent } from './ditale-members/ditale-members.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { ListMembersComponent } from './list-members/list-members.component';
import { HomeMembersComponent } from './home-members/home-members.component';
import { CardMemberComponent } from './card-member/card-member.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ListMembersComponent,DitaleMembersComponent,HomeMembersComponent, CardMemberComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule
  ]
})
export class MembersModule { }
