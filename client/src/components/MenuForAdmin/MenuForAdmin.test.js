import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, testStore, checkProps } from "../../utils/testUtils";
import ConnectedMenuForAdmin, { MenuForAdmin } from "./index";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedMenuForAdmin store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("MenuForAdmin component", () => {
  describe("Component rendering (connected component, authorised user)", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({
        user: {
          isAuthenticated: true,
          user: {
            name: "Simon"
          }
        }
      });
    });

    test("should render without error", () => {
      const component = findByTestAttr(wrapper, "menuForAdmin-component");
      expect(component.length).toBe(1);
    });

    test("should render header", () => {
      const header = findByTestAttr(wrapper, "header");
      expect(header.length).toBe(1);
    });

    test("should render paragraph", () => {
      const para = findByTestAttr(wrapper, "paragraph");
      expect(para.length).toBe(1);
    });

    test("should render link to user menu", () => {
      const menuLink = findByTestAttr(wrapper, "menuLink");
      expect(menuLink.length).toBe(1);
    });

    test("should render link for toggleAdmin", () => {
      const toggleAdminLink = findByTestAttr(wrapper, "toggleAdminLink");
      expect(toggleAdminLink.length).toBe(1);
    });

    test("should render link for delete a user", () => {
      const deleteUserLink = findByTestAttr(wrapper, "deleteUserLink");
      expect(deleteUserLink.length).toBe(1);
    });

    test("should render link to dashboard page", () => {
      const dashboardLink = findByTestAttr(wrapper, "dashboardLink");
      expect(dashboardLink.length).toBe(1);
    });
  });

  describe("Component rendering (connected component - user NOT authorised)", () => {
    test("should not render MenuForAdmin component and redirect instead, if user is not authorised", () => {
      const wrapper = setup({
        user: {
          isAuthenticated: false,
          user: {
            name: "Simon"
          }
        }
      });
      const component = findByTestAttr(wrapper, "menuForAdmin-component");
      expect(component.length).toBe(0);
      const redirect = findByTestAttr(wrapper, "redirect");
      expect(redirect.length).toBe(1);
    });
  });

  // UNCONNECTED COMPONENT
  describe("Prop types", () => {
    test("should not throw warning with expected props", () => {
      const expectedProps = {
        isAuthenticated: true,
        name: "Simon",
        logout: jest.fn()
      };
      checkProps(MenuForAdmin, expectedProps);
    });
  });
});
