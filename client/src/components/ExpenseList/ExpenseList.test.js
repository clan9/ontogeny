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

  describe("Check prop types with unconnected component", () => {
    test("should not throw warning with expectedProps", () => {
      const fetchUserExpensesMock = jest.fn();

      const expectedProps = {
        expenses,
        fetchUserExpenses: fetchUserExpensesMock
      };
      checkProps(ExpenseList, expectedProps);
    });
  });

  describe("ComponentDidMount LifeCycle Method", () => {
    test("should run fetchUserExpenses on ExpenseList mount", () => {
      const fetchUserExpensesMock = jest.fn();
      const props = {
        expenses,
        fetchUserExpenses: fetchUserExpensesMock
      };
      const wrapper = shallow(<ExpenseList {...props} />);
      wrapper.instance().componentDidMount();
      const mockFuncCallCount = fetchUserExpensesMock.mock.calls.length;
      expect(mockFuncCallCount).toBe(1);
    });
  });
});
