import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps, testStore } from "../../utils/testUtils";
import ConnectedAddExpense, { AddExpense } from "./index";
import expenses from "../../fixtures/expenses";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedAddExpense store={store} />).dive();
  return wrapper;
};

describe("Add Expense component", () => {
  describe("Component rendering", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render Component without error", () => {
      const component = findByTestAttr(wrapper, "add-record-component");
      expect(component.length).toBe(1);
    });

    test("should render header", () => {
      const header = findByTestAttr(wrapper, "header");
      expect(header.length).toBe(1);
    });

    test("should render expense form component", () => {
      const recordForm = findByTestAttr(wrapper, "record-form");
      expect(recordForm.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    let wrapper;
    let addExpenseMock = jest.fn();
    let history = { push: jest.fn() };

    test("should have access to the addExpense action as a function on props", () => {
      wrapper = setup();
      const addExpenseProp = wrapper.instance().props.addExpense;
      expect(addExpenseProp).toBeInstanceOf(Function);
    });

    test("should call addExpense when form submitted", () => {
      wrapper.setProps({ history, addExpense: addExpenseMock });
      wrapper.find("RecordForm").prop("onSubmit")(expenses[1]);
      expect(addExpenseMock).toHaveBeenLastCalledWith(expenses[1]);
      expect(history.push).toHaveBeenLastCalledWith("/expenses");
    });
  });
});
