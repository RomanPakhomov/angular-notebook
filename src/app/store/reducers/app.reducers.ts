import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { userReducers } from "./user.reducers";

export const appReducers: ActionReducerMap<AppState, any> = {
    router: routerReducer,
    users: userReducers
};
