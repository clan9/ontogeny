import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, testStore } from "../../utils/testUtils";
import ConnectedEditIncome, { EditIncome } from "./index";
import income from "../../fixtures/income";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedEditIncome store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("Edit income component", () => {
  describe("Component rendering", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render component without error", () => {
      const component = findByTestAttr(wrapper, "edit-income-component");
      expect(component.length).toBe(1);
    });

    test("should render header", () => {
      const header = findByTestAttr(wrapper, "header");
      expect(header.length).toBe(1);
    });

    test("should render record form component", () => {
      const recordForm = findByTestAttr(wrapper, "record-form");
      expect(recordForm.length).toBe(1);
    });

    test("should render remove income option", () => {
      const remove = findByTestAttr(wrapper, "remove-income");
      expect(remove.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    let wrapper;
    let editIncomeMock = jest.fn();
    let deleteIncomeMock = jest.fn();
    let history = { push: jest.fn() };

    beforeEach(() => {
      wrapper = setup();
    });

    test("should have access to editIncome action as a function on props", () => {
      const editIncomeProp = wrapper.instance().props.editIncome;
      expect(editIncomeProp).toBeInstanceOf(Function);
    });

    test("should call editIncome when form submitted", () => {
      wrapper.setProps({
        income: income[0],
        editIncome: editIncomeMock,
        history
      });
      wrapper.find("RecordForm").prop("onSubmit")(income[0]);
      expect(editIncomeMock.mock.calls.length).toBe(1);
      expect(editIncomeMock).toHaveBeenLastCalledWith(income[0], income[0]._id);
      expect(history.push).toHaveBeenLastCalledWith("/income");
    });

    test("should call deleteIncome when button clicked", () => {
      wrapper.setProps({
        income: income[0],
        deleteIncome: deleteIncomeMock,
        history
      });

      wrapper.find("button").simulate("click");
      expect(deleteIncomeMock.mock.calls.length).toBe(1);
      expect(deleteIncomeMock).toHaveBeenLastCalledWith(income[0]._id);
      expect(history.push).toHaveBeenLastCalledWith("/income");
    });
  });
});
