import moxios from "moxios";
import { testStore } from "../utils/testUtils";
import {
  registerUser,
  signIn,
  logout,
  fetchUsersDetails,
  toggleAdmin,
  deleteUser,
  adminDeleteUser
} from "../actions/user/user";

describe("User action creator and reducer", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("Successful registration/signin", () => {
    let store;
    let token;
    let user;
    let users;
    let expectedState;

    beforeEach(() => {
      store = testStore();
      token = "testToken";
      user = { name: "Simon", email: "test@test.com" };
      users = [];
      expectedState = {
        user,
        users,
        token,
        isAuthenticated: true,
        loading: false,
        error: "",
        adminStatusMsg: ""
      };
    });

    test("should add a newly registered user to the state", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: { user, token }
        });
      });

      await store.dispatch(registerUser());
      const newState = store.getState();
      expect(newState.user).toEqual(expectedState);
    });

    test("should sign in an existing user", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { user, token }
        });
      });

      await store.dispatch(signIn());
      const newState = store.getState();
      expect(newState.user).toEqual(expectedState);
    });
  });

  describe("Logout user on single/multiple devices", () => {
    let store;
    let expectedState;

    beforeEach(() => {
      store = testStore();
      expectedState = {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {},
        users: [],
        error: "",
        adminStatusMsg: ""
      };
    });

    test("should logout user and update state", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            msg: "Logged out"
          }
        });
      });

      await store.dispatch(logout());
      const newState = await store.getState();
      expect(newState.user).toEqual(expectedState);
    });
  });

  describe("User deleting their account", () => {
    let store;

    beforeEach(() => {
      store = testStore();
    });

    test("should update state correctly when a user deletes their account", async () => {
      const expectedState = {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {},
        users: [],
        error: "",
        adminStatusMsg: ""
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200
        });
      });

      await store.dispatch(deleteUser());
      const newState = store.getState();
      expect(newState.user).toEqual(expectedState);
    });

    test("should update state correctly when user cannot delete their account due to being the only user with an admin status", async () => {
      const msg =
        "You are currently the only user with Admin access therefore you cannot delete your account at this time";

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 403,
          response: {
            msg
          }
        });
      });

      await store.dispatch(deleteUser());
      const newState = store.getState();
      expect(newState.user.error).toBe(msg);
    });
  });

  // ADMIN TESTS
  describe("Fetch a list of users and toggle the isAdmin status", () => {
    let store;

    beforeEach(() => {
      store = testStore();
    });

    test("should update state correctly when fetchUserDetails action is run", async () => {
      const users = [
        { name: "simon", email: "s@gmail.com", isAdmin: true },
        { name: "lee", email: "l@gmail.com", isAdmin: false }
      ];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: users
        });
      });

      await store.dispatch(fetchUsersDetails());
      const newState = await store.getState();
      expect(newState.user.users).toEqual(users);
    });

    test("should update state correctly when toggleAdmin action is run", async () => {
      const users = [
        { name: "simon", email: "s@gmail.com", isAdmin: true },
        { name: "lee", email: "l@gmail.com", isAdmin: false }
      ];
      const msg = "Admin status has been updated";

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: users
        });
      });

      await store.dispatch(toggleAdmin());
      const newState = store.getState();
      expect(newState.user.users).toEqual(users);
      expect(newState.user.adminStatusMsg).toBe(msg);
    });

    test("should update state correctly when admin user has deleted another users account", async () => {
      const users = [{ name: "simon" }, { name: "lee" }];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: users
        });
      });

      await store.dispatch(adminDeleteUser());
      const newState = store.getState();
      expect(newState.user.users).toEqual(users);
    });

    test("should update state error when admin user tries to delete their own account and there are no other users with an admin status", async () => {
      const msg =
        "You are currently the only user with Admin access therefore you cannot delete your account at this time";

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 403,
          response: {
            msg
          }
        });
      });

      await store.dispatch(adminDeleteUser());
      const newState = store.getState();
      expect(newState.user.error).toBe(msg);
    });
  });
});
