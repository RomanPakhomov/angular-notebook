import { NotebookConfigModel } from "src/app/types/configuration.model";

export interface ConfigState {
    notebookConfig: NotebookConfigModel;
}

export const initialConfigState: ConfigState = {
    notebookConfig: {} as NotebookConfigModel
}