import { actionTypes } from "../../actions/types";

const initialState = {
  token: localStorage.getItem("authToken"),
  isAuthenticated: false,
  loading: true,
  user: null,
  error: ""
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.REGISTER_USER:
    case actionTypes.SIGN_IN:
      localStorage.setItem("authToken", payload.token);
      return {
        ...state,
        user: { ...payload.user },
        token: payload.token,
        isAuthenticated: true,
        loading: false
      };
    case actionTypes.LOG_IN_ERROR:
      localStorage.removeItem("authToken");
      return {
        ...initialState,
        token: null,
        loading: false,
        error: payload
      };
    case actionTypes.LOG_OUT:
      localStorage.removeItem("authToken");
      return {
        ...initialState,
        token: null,
        loading: false
      };
    default:
      return state;
  }
};
