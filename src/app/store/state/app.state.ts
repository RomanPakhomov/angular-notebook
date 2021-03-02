import { RouterReducerState } from "@ngrx/router-store";
import { ConfigState, initialConfigState } from "./config.state";
import { initialUserState, UserState } from "./user.state";

export interface AppState {
    router?: RouterReducerState;
    users: UserState;
    config: ConfigState;
}

export const initialAppState: AppState = {
    users: initialUserState,
    config: initialConfigState
}

export function getInitialState(): AppState {
    return initialAppState;
}