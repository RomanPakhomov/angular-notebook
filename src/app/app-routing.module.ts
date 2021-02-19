import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCardComponent } from './components/userCard/user-card.component';
import { UserListComponent } from './components/userList/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent},
  { path: 'user', component: UserCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
