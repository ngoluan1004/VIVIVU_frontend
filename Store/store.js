import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer.js";
import { postReducer } from "./Post/Reducer.js";

const rootRducers=combineReducers({
    auth:authReducer,
    post:postReducer,
});

export const store = legacy_createStore(rootRducers, applyMiddleware(thunk))