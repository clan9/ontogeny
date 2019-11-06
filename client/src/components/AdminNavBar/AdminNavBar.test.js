import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps, testStore } from "../../utils/testUtils";
import ConnectedAdminNavBar, { AdminNavBar } from "./index";
import { logout } from "../../actions/user/user";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedAdminNavBar store={store} />).dive();
  return wrapper;
};

describe("AdminNavBar component", () => {
  describe("Component rendering", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("Should render Component without error", () => {
      const component = findByTestAttr(wrapper, "adminNavBar");
      expect(component.length).toBe(1);
    });

    test("Should render link to homepage", () => {
      const homeLink = findByTestAttr(wrapper, "home-link");
      expect(homeLink.length).toBe(1);
    });

    test("Should render logout link", () => {
      const logoutLink = findByTestAttr(wrapper, "logout-link");
      expect(logoutLink.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    let wrapper;
    let logoutMock = jest.fn();

    beforeEach(() => {
      wrapper = setup();
    });

    test("should call logout when logout link is clicked", () => {
      wrapper.setProps({ logout: logoutMock });
      const link = findByTestAttr(wrapper, "logout-link");
      link.simulate("click");
      expect(logoutMock.mock.calls.length).toBe(1);
    });
  });
});
