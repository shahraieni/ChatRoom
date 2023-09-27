import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMembersComponent } from './home-members/home-members.component';
import { ListMembersComponent } from './list-members/list-members.component';

const routes: Routes = [
  {path:"",component:HomeMembersComponent,children:
  [
    { path :"",component:ListMembersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
