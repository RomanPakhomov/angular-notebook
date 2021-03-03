import { Action } from "@ngrx/store";

export enum EConfigActions {
    getNotebookConfig = 'getNotebookConfig',
    setNotebookPage = 'setNotebookPage',
    setNotebookFilter = 'setNotebookFilter',
    SetNotebookSortField = 'setNotebookSortField',
    SetNotebookSortVector = 'setNotebookSortVector'
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

export class SetNotebookSortField implements Action {
    public readonly type = EConfigActions.SetNotebookSortField;
    constructor(public payload: string) {}
}

export class SetNotebookSortVector implements Action {
    public readonly type = EConfigActions.SetNotebookSortVector;
    constructor(public payload: string) {}
}

export type ConfigActions = GetNotebookConfig
    | SetNotebookPage
    | SetNotebookFilter
    | SetNotebookSortField
    | SetNotebookSortVector;