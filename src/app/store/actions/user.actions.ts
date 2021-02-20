import { Action } from "@ngrx/store";
import { UserModel } from "src/app/types/user.model";
import { TodoModel } from "src/app/types/todo.model";

export enum EUserActions {
    getUser = 'getUser',
    getUserSuccess = 'getUserSuccess',
    getUsers = 'getUsers',
    getUsersSuccess = 'getUsersSuccess',
    getUserTodos = 'getUserTodos',
    getUserTodosSuccess = 'getUserTodosSuccess',
    clearUserTodos = 'clearUserTodos'
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

export class GetUserTodos implements Action {
    public readonly type = EUserActions.getUserTodos;
    constructor(public payload: number) {}
}

export class GetUserTodosSuccess implements Action {
    public readonly type = EUserActions.getUserTodosSuccess;
    constructor(public payload: TodoModel[]) {}
}

export class ClearUserTodos implements Action {
    public readonly type = EUserActions.clearUserTodos;
}

export type UserActions = GetUser 
    | GetUsers
    | GetUserSuccess
    | GetUsersSuccess
    | GetUserTodos
    | GetUserTodosSuccess
    | ClearUserTodos;