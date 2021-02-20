import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCardContainerComponent } from './components/userCardContainer/user-card-container.component';
import { UserListComponent } from './components/userList/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent},
  { path: 'user/:id', component: UserCardContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
