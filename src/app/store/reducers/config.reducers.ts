import { ConfigState, initialConfigState } from "../state/config.state";
import { ConfigActions } from "../actions/config.actions";
import { EConfigActions } from "../actions/config.actions";

export const configReducers = (
    state = initialConfigState,
    action: ConfigActions
): ConfigState => {
    switch(action.type){
        case EConfigActions.getNotebookConfig: {
            return state     
        }
        case EConfigActions.setNotebookFilter: {
            return {
                notebookConfig: {
                    ...state.notebookConfig,
                    currentFilter: {
                        companyName: action.payload
                    }
                }
            }
        }
        case EConfigActions.setNotebookPage: {
            return {
                notebookConfig: {
                    ...state.notebookConfig,
                    currentPage: action.payload
                }
            }
        }
        case EConfigActions.SetNotebookSortField: {
            return {
                notebookConfig: {
                    ...state.notebookConfig,
                    currentSort: {
                        ...state.notebookConfig.currentSort,
                        sortField: action.payload
                    }
                }
            }
        }
        case EConfigActions.SetNotebookSortVector: {
            return {
                notebookConfig: {
                    ...state.notebookConfig,
                    currentSort: {
                        ...state.notebookConfig.currentSort,
                        sortVector: action.payload
                    }
                }
            }
        }
        default: 
            return state
    }
}