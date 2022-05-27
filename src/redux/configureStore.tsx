/*=====================================
    configureStore

    Author: Jhang
    CreateTime: 2022 / 05 / 19
=====================================*/

import { createStore, combineReducers, applyMiddleware } from "redux";
import { AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "./modules/appReducer";

const middleWare = applyMiddleware(thunk);
const actionReducers = combineReducers({
    app: appReducer,
});

const rootStore = createStore(actionReducers, {}, composeWithDevTools(middleWare));

export default rootStore;
export type RootState = ReturnType<typeof actionReducers>;
export type RootDispatch = ThunkDispatch<RootState, any, AnyAction>;
