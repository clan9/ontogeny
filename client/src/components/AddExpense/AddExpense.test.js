import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps, testStore } from "../../utils/testUtils";
import ConnectedAddExpense, { AddExpense } from "./index";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedAddExpense store={store} />).dive();
  // .dive();
  return wrapper;
};

describe("Add Expense component", () => {
  describe("Component rendering", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render Component without error", () => {
      const component = findByTestAttr(wrapper, "add-expense-component");
      expect(component.length).toBe(1);
      // console.log(wrapper.debug());
    });

    test("should render header", () => {
      const header = findByTestAttr(wrapper, "header");
      expect(header.length).toBe(1);
    });

    test("should render expense form component", () => {
      const expenseForm = findByTestAttr(wrapper, "expense-form");
      expect(expenseForm.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    const wrapper = setup();
    const addExpenseProp = wrapper.instance().props.addExpense;
    expect(addExpenseProp).toBeInstanceOf(Function);
  });
});
