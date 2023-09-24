import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMembersComponent } from './home-members/home-members.component';
import { DitaleMembersComponent } from './ditale-members/ditale-members.component';
import { ListMembersComponent } from './list-members/list-members.component';



@NgModule({
  declarations: [
    HomeMembersComponent,
    DitaleMembersComponent,
    ListMembersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MembersModule { }
