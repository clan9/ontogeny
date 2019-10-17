import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps, testStore } from "../../utils/testUtils";
import ConnectedEditExpense, { EditExpense } from "./index";
import expenses from "../../fixtures/expenses";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedEditExpense store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("Edit expense component", () => {
  describe("Component rendering", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render component without error", () => {
      const component = findByTestAttr(wrapper, "edit-expense-component");
      expect(component.length).toBe(1);
    });

    test("should render header", () => {
      const header = findByTestAttr(wrapper, "header");
      expect(header.length).toBe(1);
    });

    test("should render expense form component", () => {
      const expenseForm = findByTestAttr(wrapper, "expense-form");
      expect(expenseForm.length).toBe(1);
    });

    test("should render remove expense option", () => {
      const remove = findByTestAttr(wrapper, "remove-expense");
      expect(remove.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    let wrapper;
    let editExpenseMock = jest.fn();
    let deleteExpenseMock = jest.fn();
    let history = { push: jest.fn() };

    beforeEach(() => {
      wrapper = setup();
    });

    test("should have access to editExpense action as a function on props", () => {
      const editExpenseProp = wrapper.instance().props.editExpense;
      expect(editExpenseProp).toBeInstanceOf(Function);
    });

    test("should call editExpense when form submitted", () => {
      wrapper.setProps({
        expense: expenses[0],
        editExpense: editExpenseMock,
        history
      });
      wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
      expect(editExpenseMock.mock.calls.length).toBe(1);
      expect(editExpenseMock).toHaveBeenLastCalledWith(
        expenses[0],
        expenses[0]._id
      );
      expect(history.push).toHaveBeenLastCalledWith("/expenses");
    });

    test("should call deleteExpense when button clicked", () => {
      wrapper.setProps({
        expense: expenses[0],
        deleteExpense: deleteExpenseMock,
        history
      });

      wrapper.find("button").simulate("click");
      expect(deleteExpenseMock.mock.calls.length).toBe(1);
      expect(deleteExpenseMock).toHaveBeenLastCalledWith(expenses[0]._id);
      expect(history.push).toHaveBeenLastCalledWith("/expenses");
    });
  });
});
