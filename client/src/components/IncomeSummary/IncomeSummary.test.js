import React from "react";
import ConnectedIncomeSummary, { IncomeSummary } from "./index";
import { shallow } from "enzyme";
import { findByTestAttr, testStore, checkProps } from "../../utils/testUtils";
import income from "../../fixtures/expenses";
import { filters } from "../../fixtures/filters";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedIncomeSummary store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("IncomeSummary component", () => {
  describe("Component rendering", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render component without error", () => {
      const component = findByTestAttr(wrapper, "summary-component");
      expect(component.length).toBe(1);
    });

    test("should render summary h1", () => {
      const heading = findByTestAttr(wrapper, "heading");
      expect(heading.length).toBe(1);
    });

    test("should render add expense link", () => {
      const addLink = findByTestAttr(wrapper, "add-income");
      expect(addLink.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({
        income,
        filters
      });
    });

    test("should have access to incomeCount data in state", () => {
      const incomeCountProp = wrapper.instance().props.incomeCount;
      expect(incomeCountProp).toBe(income.length);
    });

    test("should have access to the incomeTotal data in state", () => {
      const incomeTotalProp = wrapper.instance().props.incomeTotal;
      const total = income[0].amount + income[1].amount + income[2].amount;
      expect(incomeTotalProp).toBe(total);
    });
  });

  // UNCONNECTED COMPONENT
  describe("Check prop types with unconnected component", () => {
    test("should not throw warning with expected props", () => {
      const expectedProps = {
        incomeCount: 2,
        incomeTotal: 98765
      };
      checkProps(IncomeSummary, expectedProps);
    });
  });
});
