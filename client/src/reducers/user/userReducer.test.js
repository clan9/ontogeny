import { actionTypes } from "../../actions/types";
import userReducer from "./userReducer";

describe("User reducer", () => {
  describe("Initial state", () => {
    test("should return default state at startup", () => {
      const initialState = {
        token: localStorage.getItem("authToken"),
        isAuthenticated: false,
        loading: true,
        user: {},
        users: [],
        error: "",
        adminStatusMsg: ""
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
        users: [],
        error: "",
        adminStatusMsg: ""
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
        user: {},
        users: [],
        error: "Unable to log in",
        adminStatusMsg: ""
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe("User deleting their account", () => {
    test("should update state correctly when a user deletes their account", () => {
      const expectedState = {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {},
        users: [],
        error: "",
        adminStatusMsg: ""
      };

      const action = { type: actionTypes.DELETE_USER };

      const newState = userReducer(undefined, action);
      expect(newState).toEqual(expectedState);
    });

    test("should update state correctly when user unable to delete their account because they are the only current admin user", () => {
      const msg =
        "You are currently the only user with Admin access therefore you cannot delete your account at this time";

      const action = { type: actionTypes.DELETE_USER_ERROR, payload: msg };
      const newState = userReducer(undefined, action);
      expect(newState.error).toBe(msg);
    });
  });

  // ADMIN TESTS
  describe("Admin user tests", () => {
    let state;
    let users;

    beforeEach(() => {
      state = {
        token: "testToken",
        isAuthenticated: true,
        loading: false,
        user: {
          _id: "1",
          name: "Simon",
          email: "s@test.com"
        },
        users: [],
        error: "",
        adminStatusMsg: ""
      };

      users = [
        { _id: "1", name: "Simon", email: "s@test.com" },
        { _id: "2", name: "Lee", email: "l@test.com" }
      ];
    });

    test("should update state correctly when FETCH_USER_DETAILS action is received", () => {
      const action = {
        type: actionTypes.FETCH_USERS_DETAILS,
        payload: users
      };

      const expectedState = {
        ...state,
        users: [...users]
      };

      const newState = userReducer(state, action);

      expect(newState).toEqual(expectedState);
    });

    test("should update state correctly when TOGGLE_ADMIN action is received", () => {
      const action = {
        type: actionTypes.TOGGLE_ADMIN,
        payload: {
          users: users,
          msg: "Admin status has been updated"
        }
      };

      const expectedState = {
        ...state,
        users: [...users],
        adminStatusMsg: action.payload.msg
      };

      const newState = userReducer(state, action);
      expect(newState).toEqual(expectedState);
    });

    test("should update error message on state when ADMIN_ERROR action is received", () => {
      const action = {
        type: actionTypes.ADMIN_ERROR,
        payload: "test error message"
      };
      const expectedState = {
        ...state,
        error: action.payload
      };

      const newState = userReducer(state, action);
      expect(newState).toEqual(expectedState);
    });

    test("should update state when ADMIN_DELETE_USER action received", () => {
      const action = {
        type: actionTypes.ADMIN_DELETE_USER,
        payload: [{ name: "Jess" }]
      };
      const newState = userReducer(state, action);
      expect(newState.users).toEqual(action.payload);
    });
  });
});
