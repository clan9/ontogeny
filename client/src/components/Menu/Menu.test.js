import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, testStore, checkProps } from "../../utils/testUtils";
import ConnectedMenu, { Menu } from "./index";
import { JestEnvironment } from "@jest/environment";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedMenu store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("Menu component", () => {
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
      const component = findByTestAttr(wrapper, "menu-component");
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

    test('should render error message container', () => {
      const errContainer = findByTestAttr(wrapper, 'error-container');
      expect(errContainer.length).toBe(1);
    });

    test("should render link to expenses page", () => {
      const expenseLink = findByTestAttr(wrapper, "expenseLink");
      expect(expenseLink.length).toBe(1);
    });

    test("should render link to income page", () => {
      const incomeLink = findByTestAttr(wrapper, "incomeLink");
      expect(incomeLink.length).toBe(1);
    });

    test("should render link to dashboard page", () => {
      const dashboardLink = findByTestAttr(wrapper, "dashboardLink");
      expect(dashboardLink.length).toBe(1);
    });
  });

  describe("Component rendering (connected component - user NOT authorised)", () => {
    test("should not render Menu component and redirect instead, if user is not authorised", () => {
      const wrapper = setup({
        user: {
          isAuthenticated: false,
          user: {
            name: "Simon"
          }
        }
      });
      const component = findByTestAttr(wrapper, "menu-component");
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
        logout: jest.fn(),
        error: ''
      };
      checkProps(Menu, expectedProps);
    });

  });
});
