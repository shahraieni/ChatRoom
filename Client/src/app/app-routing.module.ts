import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './_guards/auth.guard';
import { ErrorsComponent } from './errors/errors.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'members', canActivate: [AuthGuard],
  loadChildren: () => import('./members/members.module').then((x) => x.MembersModule) },
  { path: 'lists', canActivate: [AuthGuard], loadChildren: () => import('./list/list.module').then((x) => x.ListModule) },
  { path: 'messages', canActivate: [AuthGuard], loadChildren: () => import('./messages/messages.module').then((x) => x.MessagesModule) },
  { path : 'errors' , component: ErrorsComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
