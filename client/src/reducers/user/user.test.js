import { actionTypes } from "../../actions/types";
import userReducer from "./user";

describe("User reducer", () => {
  test("should return default state at startup", () => {
    const initialState = {
      token: localStorage.getItem("authToken"),
      isAuthenticated: false,
      loading: true,
      user: null,
      error: ""
    };
    const newState = userReducer(undefined, { type: "@@INIT" });
    expect(newState).toEqual(initialState);
  });

  test("should update state when REGISTER_USER action type received", () => {
    const user = {
      name: "Simon",
      email: "test@test.com"
    };

    const token = "testAuthToken";

    const newState = userReducer(undefined, {
      type: actionTypes.REGISTER_USER,
      payload: { user, token }
    });

    const expectedState = {
      token: "testAuthToken",
      isAuthenticated: true,
      loading: false,
      user: {
        name: "Simon",
        email: "test@test.com"
      },
      error: ""
    };

    expect(newState).toEqual(expectedState);
  });

  test("should return correct state when LOG_IN_ERROR action is received", () => {
    const newState = userReducer(undefined, {
      type: actionTypes.LOG_IN_ERROR,
      payload: "Unable to log in"
    });
    const expectedState = {
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
      error: "Unable to log in"
    };
    expect(newState).toEqual(expectedState);
  });
});
