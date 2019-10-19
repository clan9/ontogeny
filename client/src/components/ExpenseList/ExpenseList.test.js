import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps, testStore } from "../../utils/testUtils";
import ConnectedExpenseList, { ExpenseList } from "./index";
import expenses from "../../fixtures/expenses";
import { filters } from "../../fixtures/filters";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedExpenseList store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("ExpenseList component", () => {
  describe("Component rendering (connected component)", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render component withour error", () => {
      const component = findByTestAttr(wrapper, "expense-list-component");
      expect(component.length).toBe(1);
    });

    test("should render no expenses message if the filtered expense array is empty", () => {
      const messageDiv = findByTestAttr(wrapper, "no-expenses-msg");
      expect(messageDiv.length).toBe(1);
    });

    test("should not render `no incomes` message when there is income data in state", () => {
      wrapper = setup({ expenses });
      const msg = findByTestAttr(wrapper, "no-expenses-msg");
      expect(msg.length).toBe(0);
    });
  });

  describe("Redux props", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({ expenses, filters });
    });

    test("should receive filtered (sorted by date) expenses array from mapStateToProps as a prop", () => {
      const expensesProp = wrapper.instance().props.expenses;
      const filteredExpenses = [expenses[1], expenses[0], expenses[2]];
      expect(expensesProp).toEqual(filteredExpenses);
    });

    test("should have access to the fetchUserExpenses function as a prop", () => {
      const fetchUserExpensesProp = wrapper.instance().props.fetchUserExpenses;
      expect(fetchUserExpensesProp).toBeInstanceOf(Function);
    });

    test("should render expense list items when filtered expense array is not empty", () => {
      const expenseListItems = findByTestAttr(wrapper, "expense-list-item");
      expect(expenseListItems.length).toBe(3);
    });
  });

  // UNCONNECTED COMPONENT

  describe("Check prop types and lifecycle method call with unconnected component", () => {
    let expectedProps, fetchUserExpensesMock;

    beforeEach(() => {
      fetchUserExpensesMock = jest.fn();
      expectedProps = {
        expenses,
        fetchUserExpenses: fetchUserExpensesMock
      };
    });

    test("should not throw warning with expectedProps", () => {
      checkProps(ExpenseList, expectedProps);
    });

    test("should run fetchUserExpenses on ExpenseList mount", () => {
      const wrapper = shallow(<ExpenseList {...expectedProps} />);
      wrapper.instance().componentDidMount();
      const mockFuncCallCount = fetchUserExpensesMock.mock.calls.length;
      expect(mockFuncCallCount).toBe(1);
    });
  });
});
