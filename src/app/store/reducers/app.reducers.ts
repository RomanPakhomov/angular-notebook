import { routerReducer } from "@ngrx/router-store";
import { Action, ActionReducerMap } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { configReducers } from "./config.reducers";
import { userReducers } from "./user.reducers";

export const appReducers: ActionReducerMap<AppState, Action> = {
    router: routerReducer,
    users: userReducers,
    config: configReducers
};
