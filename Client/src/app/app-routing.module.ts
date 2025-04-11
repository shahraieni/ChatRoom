import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'members', loadChildren:()=>import('./members/members.module').then((x)=>x.MembersModule)},
  {path : 'lists', loadChildren:()=>import('./list/list.module').then((x)=>x.ListModule)},
  {path : 'messages', loadChildren:()=>import('./messages/messages.module').then((x)=>x.MessagesModule)},
  {path : '**' , component :NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
