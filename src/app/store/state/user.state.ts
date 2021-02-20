import { TodoModel } from "src/app/types/todo.model";
import { UserModel } from "src/app/types/user.model";

export interface UserState {
    users: UserModel[],
    selectedUser: UserModel,
    userTodos: TodoModel[]
}

export const initialUserState: UserState = {
    users: [] as UserModel[],
    selectedUser: {} as UserModel,
    userTodos: [] as TodoModel[]
}