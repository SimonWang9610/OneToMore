import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import articleReducers from "./reducer";

export const articleStore = createStore(articleReducers, {}, applyMiddleware(thunk));