import { actionTypes } from "../../actions/types";

const initialState = {
  token: localStorage.getItem("authToken"),
  isAuthenticated: false,
  loading: true,
  user: {},
  users: [],
  error: "",
  adminStatusMsg: ""
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
    case actionTypes.FETCH_USERS_DETAILS:
      return {
        ...state,
        users: [...payload]
      };
    case actionTypes.TOGGLE_ADMIN:
      return {
        ...state,
        users: [...payload.users],
        adminStatusMsg: payload.msg,
        user: payload.users.find(user => user._id === state.user._id)
      };
    case actionTypes.ADMIN_ERROR:
    case actionTypes.DELETE_USER_ERROR:
      return {
        ...state,
        error: payload
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
    case actionTypes.DELETE_USER:
      localStorage.removeItem("authToken");
      return {
        ...initialState,
        token: null,
        loading: false
      };
    case actionTypes.ADMIN_DELETE_USER:
      if (payload._id === state.user._id) {
        localStorage.removeItem("authToken");
      }
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload._id)
      };
    case actionTypes.RESET_ADMIN_MSG:
      return {
        ...state,
        adminStatusMsg: ""
      };
    case actionTypes.RESET_ERROR_MSG:
      return {
        ...state,
        error: ""
      };
    default:
      return state;
  }
};
