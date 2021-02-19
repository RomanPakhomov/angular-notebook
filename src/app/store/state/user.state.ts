import { UserModel } from "src/app/types/user.model";

export interface UserState {
    users: UserModel[],
    selectedUser: UserModel
}

export const initialUserState: UserState = {
    users: [] as UserModel[],
    selectedUser: {} as UserModel
}