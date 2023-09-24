import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMembersComponent } from './home-members/home-members.component';
import { DitaleMembersComponent } from './ditale-members/ditale-members.component';



@NgModule({
  declarations: [
    HomeMembersComponent,
    DitaleMembersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MembersModule { }
