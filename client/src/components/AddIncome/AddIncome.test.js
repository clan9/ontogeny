import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps, testStore } from "../../utils/testUtils";
import ConnectedAddIncome, { AddIncome } from "./index";
import income from "../../fixtures/income";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedAddIncome store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("Add Income component", () => {
  describe("Component rendering", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render Component without error", () => {
      const component = findByTestAttr(wrapper, "add-income-component");
      expect(component.length).toBe(1);
    });

    test("should render header", () => {
      const header = findByTestAttr(wrapper, "header");
      expect(header.length).toBe(1);
    });

    test("should render income form component", () => {
      const recordForm = findByTestAttr(wrapper, "record-form");
      expect(recordForm.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    let wrapper;
    let addIncomeMock = jest.fn();
    let history = { push: jest.fn() };

    test("should have access to the addIncome action as a function on props", () => {
      wrapper = setup();
      const addIncomeProp = wrapper.instance().props.addIncome;
      expect(addIncomeProp).toBeInstanceOf(Function);
    });

    test("should call addIncome when form submitted", () => {
      wrapper.setProps({ history, addIncome: addIncomeMock });
      wrapper.find("RecordForm").prop("onSubmit")(income[1]);
      expect(addIncomeMock).toHaveBeenLastCalledWith(income[1]);
      expect(history.push).toHaveBeenLastCalledWith("/income");
    });
  });
});
