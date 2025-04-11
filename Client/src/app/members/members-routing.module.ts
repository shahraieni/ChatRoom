import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ListMemberComponent } from './list-member/list-member.component';
import { HomeMemberComponent } from './home-member/home-member.component';

const routes: Routes = [
  {path:'',component:HomeMemberComponent,children : [{path:'',component:ListMemberComponent}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
