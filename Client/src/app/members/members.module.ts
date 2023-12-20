import { ReactiveFormsModule } from '@angular/forms';
import { DitaleMembersComponent } from './ditale-members/ditale-members.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { ListMembersComponent } from './list-members/list-members.component';
import { HomeMembersComponent } from './home-members/home-members.component';
import { CardMemberComponent } from './card-member/card-member.component';
import { SharedModule } from '../shared/shared.module';
import { EditMemberComponent } from './edit-member/edit-member.component';


@NgModule({
  declarations: [
    ListMembersComponent,
    DitaleMembersComponent,
    HomeMembersComponent,
     CardMemberComponent,
      EditMemberComponent
    ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MembersModule { }
