import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { UserService } from "src/app/services/user.service";
import { EUserActions, GetUser, GetUsers, GetUsersSuccess, GetUserSuccess, GetUserTodos, GetUserTodosSuccess } from "../actions/user.actions";
import { AppState } from "../state/app.state";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { UserModel } from "src/app/types/user.model";
import { selectUserList } from "../selectors/user.selector";
import { TodoModel } from "src/app/types/todo.model";

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions,
        private userService: UserService,
        private store: Store<AppState>
    ) {}

    getUsers = createEffect(() => this.actions.pipe(
        ofType<GetUsers>(EUserActions.getUsers),
        switchMap(() => this.userService.getUsers()),
        switchMap((users: UserModel[]) => {
            const sortedUsers = users.sort((a,b) => a.name.localeCompare(b.name));
            return of(new GetUsersSuccess(sortedUsers))
        })
    ))

    getUser = createEffect(() => this.actions.pipe(
        ofType<GetUser>(EUserActions.getUser),
        map(action => action.payload),
        withLatestFrom(this.store.pipe(select(selectUserList))),
        switchMap(([id, users]) => {
            const selectedUser = users.filter((user: UserModel) => user.id === +id)[0];
            return of({selectedUser, id});
        }),
        switchMap(({selectedUser, id}) => {
            if(selectedUser){
                return of(selectedUser);
            }
            return this.userService.getUser(id).pipe(
                map((user: UserModel[]) => user[0])
            );
        }),
        switchMap((user: UserModel) => of(new GetUserSuccess(user)))
    ))

    getUserTodos = createEffect(() => this.actions.pipe(
        ofType<GetUserTodos>(EUserActions.getUserTodos),
        map(action => action.payload),
        switchMap((id: number) => this.userService.getUserTodos(id)),
        switchMap((todos: TodoModel[]) => {
            const sortedTodos = todos.sort((a,b) => Number(a.completed) - Number(b.completed));
            return of(new GetUserTodosSuccess(sortedTodos));
        })
    ))
}