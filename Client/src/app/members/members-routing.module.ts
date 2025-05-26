import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMemberComponent } from './home-member/home-member.component';
import { ListMemberComponent } from './list-member/list-member.component';
import { DetailMemberComponent } from './detail-member/detail-member.component';
import { GetMemberResolver } from '../_resolvers/get-member.resolver';

//localhost:4200/members
const routes: Routes = [
  {
    path: '',
    component: HomeMemberComponent,
    children: [
      { path: '', component: ListMemberComponent },
      //localhost:4200/members/ali
      {
        path: ':username',
        component: DetailMemberComponent,
        resolve :{member: GetMemberResolver},
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
