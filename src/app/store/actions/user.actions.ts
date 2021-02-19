import { Action } from "@ngrx/store";
import { UserModel } from "src/app/types/user.model";

export enum EUserActions {
    getUser = 'getUser',
    getUserSuccess = 'getUserSuccess',
    getUsers = 'getUsers',
    getUsersSuccess = 'getUsersSuccess'
}

export class GetUsers implements Action {
    public readonly type = EUserActions.getUsers;
}

export class GetUsersSuccess implements Action {
    public readonly type = EUserActions.getUsersSuccess;
    constructor(public payload: UserModel[]) {}
}

export class GetUser implements Action {
    public readonly type = EUserActions.getUser;
    constructor(public payload: number) {}
}

export class GetUserSuccess implements Action {
    public readonly type = EUserActions.getUserSuccess;
    constructor(public payload: UserModel) {}
}

export type UserActions = GetUser | GetUsers | GetUserSuccess | GetUsersSuccess;