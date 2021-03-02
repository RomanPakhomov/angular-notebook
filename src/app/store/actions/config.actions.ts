import { Action } from "@ngrx/store";

export enum EConfigActions {
    getNotebookConfig = 'getNotebookConfig',
    setNotebookPage = 'setNotebookPage',
    setNotebookFilter = 'setNotebookFilter'
}

export class GetNotebookConfig implements Action {
    public readonly type = EConfigActions.getNotebookConfig;
}

export class SetNotebookPage implements Action {
    public readonly type = EConfigActions.setNotebookPage;
    constructor(public payload: number) {}
}

export class SetNotebookFilter implements Action {
    public readonly type = EConfigActions.setNotebookFilter;
    constructor(public payload: string) {}
}

export type ConfigActions = GetNotebookConfig
    | SetNotebookPage
    | SetNotebookFilter;