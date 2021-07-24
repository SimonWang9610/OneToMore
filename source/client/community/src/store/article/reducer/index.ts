import { combineReducers } from "redux";
import { queryReducer, mutationReducer } from "./reducers";

const articleReducers = combineReducers({
    query: queryReducer,
    mutation: mutationReducer,
});

export default articleReducers;
export type ArticleState = ReturnType<typeof articleReducers>;