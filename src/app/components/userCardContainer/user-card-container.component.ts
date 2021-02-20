import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClearUserTodos, GetUser, GetUserTodos } from 'src/app/store/actions/user.actions';
import { selectSelectedUser, selectUserTodos } from 'src/app/store/selectors/user.selector';
import { AppState } from 'src/app/store/state/app.state';
import { TodoModel } from 'src/app/types/todo.model';
import { UserModel } from 'src/app/types/user.model';

@Component({
  selector: 'user-card-container',
  templateUrl: './user-card-container.component.html',
  styleUrls: ['./user-card-container.component.scss']
})
export class UserCardContainerComponent implements OnInit, OnDestroy {
  public selectedUser: Observable<UserModel>;
  public userTodos: Observable<TodoModel[]>;
  public userId: number;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params.id;
    this.selectedUser = this.store.pipe(select(selectSelectedUser));
    this.userTodos = this.store.pipe(select(selectUserTodos));
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUser(this.userId));
    this.store.dispatch(new GetUserTodos(this.userId));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearUserTodos());
  } 

}
