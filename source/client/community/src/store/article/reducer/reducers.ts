import { QueryTypes, QueryAction, MutationTypes, MutationAction } from "../action-types";
export const queryReducer = (state: any, action: QueryAction) => {

    switch (action.type) {
        case QueryTypes.ARTICLE:
            return action.payload;
        case QueryTypes.SINGLE:
            return action.payload;
        case QueryTypes.COLLECTED:
            return action.payload;
        case QueryTypes.COMMENTS:
            return action.payload;
        case QueryTypes.LIKED:
            return action.payload;
        default:
            return state;
    }
}

export const mutationReducer = (state: any, action: MutationAction) => {
    switch (action.type) {
        case MutationTypes.CREATE:
            return action.payload;
        case MutationTypes.EDIT:
            return action.payload;
        case MutationTypes.COLLECT:
            return action.payload;
        case MutationTypes.COMMENT:
            return action.payload;
        case MutationTypes.LIKE:
            return action.payload;
        default:
            return state;
    }
}