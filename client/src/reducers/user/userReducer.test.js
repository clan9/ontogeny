import { actionTypes } from "../../actions/types";
import userReducer from "./userReducer";

describe("User reducer", () => {
  describe("Initial state", () => {
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
  });

  describe("Successful signup/login", () => {
    let user;
    let token;
    let expectedState;

    beforeEach(() => {
      user = {
        name: "Simon",
        email: "test@test.com"
      };

      token = "testAuthToken";

      expectedState = {
        token: "testAuthToken",
        isAuthenticated: true,
        loading: false,
        user: {
          name: "Simon",
          email: "test@test.com"
        },
        error: ""
      };
    });

    test("should update state when REGISTER_USER action type received", () => {
      const newState = userReducer(undefined, {
        type: actionTypes.REGISTER_USER,
        payload: { user, token }
      });

      expect(newState).toEqual(expectedState);
    });

    test("should return correct state when SIGN_IN action is received", () => {
      const newState = userReducer(undefined, {
        type: actionTypes.SIGN_IN,
        payload: { user, token }
      });

      expect(newState).toEqual(expectedState);
    });
  });

  describe("Unsuccessful signup/login", () => {
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
});
