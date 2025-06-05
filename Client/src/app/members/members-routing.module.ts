import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMemberComponent } from './home-member/home-member.component';
import { ListMemberComponent } from './list-member/list-member.component';
import { DetailMemberComponent } from './detail-member/detail-member.component';
import { GetMemberResolver } from '../_resolvers/get-member.resolver';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { PreventUnsavedChangesGuard } from '../_guards/prevent-unsaved-chenges.guard';

//localhost:4200/members
const routes: Routes = [
  {
    path: '',
    component: HomeMemberComponent,
    children: [
      { path: '', component: ListMemberComponent },
 
      {
        path : 'edit' ,
        component:EditMemberComponent,
        canDeactivate:[PreventUnsavedChangesGuard],
        pathMatch:'full'
      },
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
