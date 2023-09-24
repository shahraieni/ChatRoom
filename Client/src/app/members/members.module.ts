import { DitaleMembersComponent } from './ditale-members/ditale-members.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { HomeComponent } from '../home/home.component';
import { ListMembersComponent } from './list-members/list-members.component';


@NgModule({
  declarations: [HomeComponent,ListMembersComponent,DitaleMembersComponent],
  imports: [
    CommonModule,
    MembersRoutingModule
  ]
})
export class MembersModule { }
