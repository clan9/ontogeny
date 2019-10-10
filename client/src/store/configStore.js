import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "../reducers";

export const middleware = [thunk];

export const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(...middleware)
)(createStore);

export const store = createStoreWithMiddleware(RootReducer);
