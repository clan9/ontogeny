import checkPropTypes from "check-prop-types";
import { createStore, applyMiddleware } from "redux";
import RootReducer from "../reducers";
import { middleware } from "../store/configStore";

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
  return propsErr;
};

export const testStore = initialState => {
  return createStore(RootReducer, initialState, applyMiddleware(...middleware));
};
