import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { findByTestAttr, checkProps } from "../../utils/testUtils";
import expenses from "../../fixtures/expenses";
import RecordForm from "./index";

const setup = (props = {}) => {
  const wrapper = shallow(<RecordForm {...props} />);
  return wrapper;
};

describe("RecordForm component", () => {
  describe("Rendering", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({ isAuthenticated: true });
    });

    test("Component should render without error", () => {
      const component = findByTestAttr(wrapper, "record-form-component");
      expect(component.length).toBe(1);
    });

    test("should render error msg div", () => {
      const errorDiv = findByTestAttr(wrapper, "errorMsg-div");
      expect(errorDiv.length).toBe(1);
    });

    test("should render description input", () => {
      const input = findByTestAttr(wrapper, "description");
      expect(input.length).toBe(1);
    });

    test("should render amount input", () => {
      const amount = findByTestAttr(wrapper, "amount");
      expect(amount.length).toBe(1);
    });

    test("should render datepicker", () => {
      const datePicker = wrapper.find(SingleDatePicker);
      expect(datePicker.length).toBe(1);
    });

    test("should render note textarea", () => {
      const note = findByTestAttr(wrapper, "note");
      expect(note.length).toBe(1);
    });

    test("should render submit button", () => {
      const button = findByTestAttr(wrapper, "submit-button");
      expect(button.length).toBe(1);
    });

    test("should render form correctly with provided expense", () => {
      const wrapper = shallow(<RecordForm record={expenses[0]} />);
      expect(wrapper.state("description")).toBe(expenses[0].description);
      expect(wrapper.state("note")).toBe(expenses[0].note);
      expect(wrapper.state("amount")).toBe(String(expenses[0].amount / 100));
      expect(wrapper.state("date")).toEqual(moment(expenses[0].date));
    });
  });

  describe("Form updates and submission", () => {
    let wrapper;
    let onSubmitMock = jest.fn();

    beforeEach(() => {
      wrapper = shallow(
        <RecordForm onSubmit={onSubmitMock} isAuthenticated={true} />
      );
    });

    test("should update the description correctly", () => {
      const value = "New Description";
      wrapper
        .find("input")
        .at(0)
        .simulate("change", { target: { value } });

      expect(wrapper.state("description")).toBe(value);
    });

    test("should update the amount for a valid value", () => {
      const value = "9.99";
      wrapper
        .find("input")
        .at(1)
        .simulate("change", { target: { value } });

      expect(wrapper.state("amount")).toBe(value);
    });

    test("should NOT update the amount for a invalid value", () => {
      const value = "9.9999";
      wrapper
        .find("input")
        .at(1)
        .simulate("change", { target: { value } });

      expect(wrapper.state("amount")).toBe("");
    });

    test("should update the note field correctly", () => {
      const value = "Adding a note";
      wrapper.find("textarea").simulate("change", { target: { value } });

      expect(wrapper.state("note")).toBe(value);
    });

    test("should update the date correctly", () => {
      const newDate = moment(0).add(5, "months");
      wrapper.find(SingleDatePicker).prop("onDateChange")(newDate);

      expect(wrapper.state("date")).toEqual(newDate);
    });

    test("should set calendar focus on change", () => {
      const focused = true;
      wrapper.find(SingleDatePicker).prop("onFocusChange")({ focused });

      expect(wrapper.state("calendarFocused")).toEqual(focused);
    });

    test("should call onSubmitMock for valid form submission", () => {
      const newState = {
        description: "test expense submission",
        amount: "£5.99"
      };

      wrapper.setState({ ...newState });
      wrapper.find("form").simulate("submit", { preventDefault: () => {} });
      expect(onSubmitMock.mock.calls.length).toBe(1);
    });

    test("should set error in state for invalid form submission", () => {
      const newState = {};
      wrapper.setState({ ...newState });
      wrapper.find("form").simulate("submit", { preventDefault: () => {} });

      expect(wrapper.state("error").length).toBeGreaterThan(0);
    });
  });
});
