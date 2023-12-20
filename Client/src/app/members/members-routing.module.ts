import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMembersComponent } from './home-members/home-members.component';
import { ListMembersComponent } from './list-members/list-members.component';
import { DitaleMembersComponent } from './ditale-members/ditale-members.component';
import { GetMemberResolver } from '../_resolvers/get-member.resolver';
import { EditMemberComponent } from './edit-member/edit-member.component';

const routes: Routes = [
  {path:"",component:HomeMembersComponent,children:
  [
    { path :"",component:ListMembersComponent},
    { path :"edit",component:EditMemberComponent},
    { path :":username",component:DitaleMembersComponent,resolve:{member:GetMemberResolver}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
