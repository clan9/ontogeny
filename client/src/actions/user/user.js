import axios from "axios";
import { actionTypes } from "../types";
import { setAuthToken } from "../../utils/setAuthToken";

export const registerUser = formData => async dispatch => {
  try {
    const res = await axios.post("/api/user/signup", formData);

    dispatch({ type: actionTypes.REGISTER_USER, payload: res.data });

    setAuthToken(res.data.token);
  } catch (error) {
    dispatch({ type: actionTypes.LOG_IN_ERROR, payload: "Unable to log in" });

    setTimeout(() => {
      dispatch({ type: actionTypes.RESET_ERROR_MSG });
    }, 5000);
  }
};

export const signIn = formData => async dispatch => {
  try {
    const res = await axios.post("/api/user/signin", formData);

    dispatch({ type: actionTypes.SIGN_IN, payload: res.data });

    setAuthToken(res.data.token);
  } catch (error) {
    dispatch({
      type: actionTypes.LOG_IN_ERROR,
      payload: "Unable to log in, please try again"
    });

    setTimeout(() => {
      dispatch({ type: actionTypes.RESET_ERROR_MSG });
    }, 5000);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post("/api/user/logout");

    dispatch({ type: actionTypes.LOG_OUT });
    dispatch({ type: actionTypes.CLEAR_EXPENSES });
    dispatch({ type: actionTypes.CLEAR_INCOMES });
  } catch (error) {
    console.error("Logout Action Error!!", error);
  }
};

export const deleteUser = () => async dispatch => {
  try {
    await axios.delete("/api/user");
    dispatch({ type: actionTypes.DELETE_USER });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_USER_ERROR,
      payload: error.response.data.msg
    });

    setTimeout(() => {
      dispatch({ type: actionTypes.RESET_ERROR_MSG });
    }, 5000);
  }
};

// ADMIN ACTIONS

export const signInAdmin = formData => async dispatch => {
  try {
    const res = await axios.post("/api/user/signinAdmin", formData);

    dispatch({ type: actionTypes.SIGN_IN, payload: res.data });
    setAuthToken(res.data.token);
  } catch (error) {
    dispatch({
      type: actionTypes.LOG_IN_ERROR,
      payload: "Unable to log in, please try again"
    });

    setTimeout(() => {
      dispatch({ type: actionTypes.RESET_ERROR_MSG });
    }, 5000);
  }
};

export const fetchUsersDetails = () => async dispatch => {
  try {
    const res = await axios.get("/api/user/listUsers");
    dispatch({ type: actionTypes.FETCH_USERS_DETAILS, payload: res.data });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_ERROR,
      payload: "Unable to find details"
    });

    setTimeout(() => {
      dispatch({ type: actionTypes.RESET_ERROR_MSG });
    }, 5000);
  }
};

export const toggleAdmin = formData => async dispatch => {
  try {
    const res = await axios.patch("/api/user/toggleAdmin", formData);

    dispatch({
      type: actionTypes.TOGGLE_ADMIN,
      payload: { users: res.data, msg: "Admin status has been updated" }
    });

    setTimeout(() => {
      dispatch({ type: actionTypes.RESET_ADMIN_MSG });
    }, 5000);
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_ERROR,
      payload: error.response.data.msg
    });

    setTimeout(() => {
      dispatch({ type: actionTypes.RESET_ERROR_MSG });
    }, 5000);
  }
};

export const adminDeleteUser = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/user/adminDeleteUser/${id}`);

    dispatch({ type: actionTypes.ADMIN_DELETE_USER, payload: res.data });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_ERROR,
      payload: error.response.data.msg
    });

    setTimeout(() => {
      dispatch({ type: actionTypes.RESET_ERROR_MSG });
    }, 5000);
  }
};

export const adminDeleteSelf = () => ({ type: actionTypes.ADMIN_DELETE_SELF });
