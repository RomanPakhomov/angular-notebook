import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { UserService } from "src/app/services/user.service";
import { EUserActions, GetUser, GetUsers, GetUsersSuccess, GetUserSuccess } from "../actions/user.actions";
import { AppState } from "../state/app.state";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { UserModel } from "src/app/types/user.model";
import { selectUserList } from "../selectors/user.selector";

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
        switchMap((users: UserModel[]) => of(new GetUsersSuccess(users)))
    ))

    getUser = createEffect(() => this.actions.pipe(
        ofType<GetUser>(EUserActions.getUser),
        map(action => action.payload),
        withLatestFrom(this.store.pipe(select(selectUserList))),
        switchMap(([id, users]) => {
            const selectedUser = users.filter((user: UserModel) => user.id === +id)[0];
            return of(new GetUserSuccess(selectedUser))
        })
    ))
}