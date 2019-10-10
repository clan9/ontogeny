import moxios from "moxios";
import { testStore } from "../utils/testUtils";
import { registerUser } from "../actions/user/user";

describe("User action creator and reducer", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("should add a newly registered user to the state", async () => {
    const store = testStore();
    const user = { name: "Simon", email: "test@test.com" };
    const token = "testToken";

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: { user, token }
      });
    });

    await store.dispatch(registerUser());
    const newState = store.getState();

    const expectedState = {
      user,
      token,
      isAuthenticated: true,
      loading: false,
      error: ""
    };

    expect(newState.user).toEqual(expectedState);
  });

  test("should sign in an existing user", async () => {
    const store = testStore();
    const user = { name: "Simon", email: "test@test.com" };
    const token = "testToken";

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user, token }
      });
    });

    // await store.dispatch();
  });
});
