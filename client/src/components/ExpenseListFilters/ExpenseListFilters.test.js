import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps, testStore } from "../../utils/testUtils";
import ConnectedExpenseListFilters, { ExpenseListFilters } from "./index";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import { filters, altFilters } from "../../fixtures/filters";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedExpenseListFilters store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("ExpenseListFilters component", () => {
  describe("Component rendering (connected component)", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render Component without error", () => {
      const component = findByTestAttr(wrapper, "expense-filters-component");
      expect(component.length).toBe(1);
    });

    test("should render text input field", () => {
      const input = findByTestAttr(wrapper, "text-input");
      expect(input.length).toBe(1);
    });

    test("should render sortBy select drop-down", () => {
      const selectDropDown = findByTestAttr(wrapper, "sort-by");
      expect(selectDropDown.length).toBe(1);
    });

    test("should render date range picker", () => {
      const datePicker = wrapper.find(DateRangePicker);
      expect(datePicker.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({ filters });
    });

    test("should have access to filters object as a prop", () => {
      const filtersProp = wrapper.instance().props.filters;
      expect(filtersProp).toEqual(filters);
    });

    test("should have access to setTextFilter action as a function on props", () => {
      const setTextFilterProp = wrapper.instance().props.setTextFilter;
      expect(setTextFilterProp).toBeInstanceOf(Function);
    });

    test("should have access to setStartDate action as a function on props", () => {
      const setStartDateProp = wrapper.instance().props.setStartDate;
      expect(setStartDateProp).toBeInstanceOf(Function);
    });

    test("should have access to setEndDate action as a function on props", () => {
      const setEndDateProp = wrapper.instance().props.setEndDate;
      expect(setEndDateProp).toBeInstanceOf(Function);
    });

    test("should have access to sortByDate action as a function on props", () => {
      const sortByDateProp = wrapper.instance().props.sortByDate;
      expect(sortByDateProp).toBeInstanceOf(Function);
    });

    test("should have access to sortByAmount action as a function on props", () => {
      const sortByAmountProp = wrapper.instance().props.sortByAmount;
      expect(sortByAmountProp).toBeInstanceOf(Function);
    });
  });

  // UNCONNECTED COMPONENT
  describe("Check prop types with unconnected component", () => {
    test("should not throw warning with expected props", () => {
      const expectedProps = {
        filters,
        setTextFilter: jest.fn(),
        setStartDate: jest.fn(),
        setEndDate: jest.fn(),
        sortByDate: jest.fn(),
        sortByAmount: jest.fn()
      };
      checkProps(ExpenseListFilters, expectedProps);
    });
  });

  describe("Check action creator calls", () => {
    let wrapper,
      setTextFilterMock,
      sortByAmountMock,
      sortByDateMock,
      setStartDateMock,
      setEndDateMock;

    beforeEach(() => {
      setTextFilterMock = jest.fn();
      sortByAmountMock = jest.fn();
      sortByDateMock = jest.fn();
      setStartDateMock = jest.fn();
      setEndDateMock = jest.fn();

      const props = {
        filters,
        setTextFilter: setTextFilterMock,
        sortByAmount: sortByAmountMock,
        sortByDate: sortByDateMock,
        setStartDate: setStartDateMock,
        setEndDate: setEndDateMock
      };

      wrapper = shallow(<ExpenseListFilters {...props} />);
    });

    test("should set text filter correctly", () => {
      const value = "new text";
      wrapper.find("input").simulate("change", { target: { value } });
      expect(setTextFilterMock.mock.calls.length).toBe(1);
      expect(setTextFilterMock).toHaveBeenLastCalledWith(value);
    });

    test("should sort by date", () => {
      const value = "date";
      wrapper.setProps({ filters: altFilters });
      wrapper.find("select").simulate("change", { target: { value } });
      expect(sortByDateMock.mock.calls.length).toBe(1);
    });

    test("should sort by amount", () => {
      const value = "amount";
      wrapper.find("select").simulate("change", { target: { value } });
      expect(sortByAmountMock.mock.calls.length).toBe(1);
    });

    test("should handle date changes", () => {
      const startDate = moment(0).add(2, "months");
      const endDate = moment(0).add(6, "months");
      wrapper.find(DateRangePicker).prop("onDatesChange")({
        startDate,
        endDate
      });
      expect(setStartDateMock.mock.calls.length).toBe(1);
      expect(setStartDateMock).toHaveBeenLastCalledWith(startDate);
      expect(setEndDateMock.mock.calls.length).toBe(1);
      expect(setEndDateMock).toHaveBeenLastCalledWith(endDate);
    });

    test("should handle date focus changes", () => {
      const calendarFocused = "endDate";
      wrapper.find(DateRangePicker).prop("onFocusChange")(calendarFocused);
      expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
    });
  });
});
