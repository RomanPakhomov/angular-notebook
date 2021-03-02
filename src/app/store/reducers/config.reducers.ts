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
                ...state,
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
                ...state,
                notebookConfig: {
                    ...state.notebookConfig,
                    currentPage: action.payload
                }
            }
        }
        default: 
            return state
    }
}