import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { ConfigState } from "../state/config.state";

const selectConfig = (state: AppState) => state.config;

export const selectNotebookConfig = createSelector(
    selectConfig,
    (state: ConfigState) => state.notebookConfig
)