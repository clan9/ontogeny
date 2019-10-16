import React from "react";
import ConnectedExpensesSummary, { ExpensesSummary } from "./index";
import { shallow } from "enzyme";
import { findByTestAttr, testStore, checkProps } from "../../utils/testUtils";
import expenses from "../../fixtures/expenses";
import { filters } from "../../fixtures/filters";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedExpensesSummary store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("ExpensesSummary component", () => {
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
      const addLink = findByTestAttr(wrapper, "add-expense");
      expect(addLink.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({
        expenses,
        filters
      });
    });

    test("should have access to expenseCount data in state", () => {
      const expenseCountProp = wrapper.instance().props.expenseCount;
      expect(expenseCountProp).toBe(expenses.length);
    });

    test("should have access to the expenseTotal data in state", () => {
      const expenseTotalProp = wrapper.instance().props.expenseTotal;
      const total =
        expenses[0].amount + expenses[1].amount + expenses[2].amount;
      expect(expenseTotalProp).toBe(total);
    });
  });

  // UNCONNECTED COMPONENT
  describe("Check prop types with unconnected component", () => {
    test("should not throw warning with expected props", () => {
      const expectedProps = {
        expenseCount: 2,
        expenseTotal: 98765
      };
      checkProps(ExpensesSummary, expectedProps);
    });
  });
});
