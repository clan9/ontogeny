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
  }
};
