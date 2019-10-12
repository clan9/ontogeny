import moxios from "moxios";
import { testStore } from "../utils/testUtils";
import { registerUser, signIn, logout } from "../actions/user/user";

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
    let expectedState;

    beforeEach(() => {
      store = testStore();
      token = "testToken";
      user = { name: "Simon", email: "test@test.com" };
      expectedState = {
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: ""
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
        user: null,
        error: ""
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
});
