import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps, testStore } from "../../utils/testUtils";
import ConnectedDashboard, { Dashboard } from "./index";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import { filters } from "../../fixtures/filters";
import expenses from "../../fixtures/expenses";
import income from "../../fixtures/income";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedDashboard store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("User Dashboard component", () => {
  describe("Component rendering (connected component)", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render component withour error", () => {
      const component = findByTestAttr(wrapper, "dash-component");
      expect(component.length).toBe(1);
    });

    test("should render h1", () => {
      const header = findByTestAttr(wrapper, "header");
      expect(header.length).toBe(1);
    });

    test("should render date range picker", () => {
      const dates = findByTestAttr(wrapper, "date-range-picker");
      expect(dates.length).toBe(1);
    });

    test("should render `no-info` message when no matching income or expenses props available", () => {
      const noInfoMsg = findByTestAttr(wrapper, "no-content");
      expect(noInfoMsg.length).toBe(1);
    });
  });

  describe("Rendering with expenses and income props", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({ expenses, income });
    });

    test("should render `content-to-show` div when there are matching expenses and income", () => {
      const contentDiv = findByTestAttr(wrapper, "content-to-show");
      expect(contentDiv.length).toBe(1);
    });

    test("should render doughnut chart for user", () => {
      const chart = findByTestAttr(wrapper, "doughnut-user");
      expect(chart.length).toBe(1);
    });

    test("should render bar chart for user", () => {
      const chart = findByTestAttr(wrapper, "barchart-user");
      expect(chart.length).toBe(1);
    });

    test("should render line chart for user", () => {
      const chart = findByTestAttr(wrapper, "linechart-user");
      expect(chart.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({
        expenses,
        income,
        filters
      });
    });

    test("should have access to expenses array as a prop", () => {
      const expensesProps = wrapper.instance().props.expenses;
      expect(expensesProps).toEqual([expenses[2], expenses[0], expenses[1]]);
    });

    test("should have access to income array as a prop", () => {
      const incomeProps = wrapper.instance().props.income;
      expect(incomeProps).toEqual([income[2], income[0], income[1]]);
    });

    test("should have access to filters object as a prop", () => {
      const filtersProp = wrapper.instance().props.filters;
      expect(filtersProp).toEqual(filters);
    });

    test("should have access to setStartDate action as a function on props", () => {
      const setStartDateProp = wrapper.instance().props.setStartDate;
      expect(setStartDateProp).toBeInstanceOf(Function);
    });

    test("should have access to setEndDate action as a function on props", () => {
      const setEndDateProp = wrapper.instance().props.setEndDate;
      expect(setEndDateProp).toBeInstanceOf(Function);
    });
  });

  // UNCONNECTED COMPONENT
  describe("Check prop types with unconnected component", () => {
    test("should not throw warning with expected props", () => {
      const expectedProps = {
        expenses,
        income,
        filters,
        fetchUserExpenses: jest.fn(),
        fetchUserIncomes: jest.fn(),
        getVisibleRecords: jest.fn(),
        setStartDate: jest.fn(),
        setEndDate: jest.fn(),
        expensesTotal: 25999,
        incomeTotal: 58999
      };

      checkProps(Dashboard, expectedProps);
    });
  });

  describe("Action creator calls", () => {
    let wrapper,
      fetchUserExpensesMock,
      fetchUserIncomesMock,
      getVisibleRecordsMock,
      setStartDateMock,
      setEndDateMock;

    beforeEach(() => {
      fetchUserExpensesMock = jest.fn();
      fetchUserIncomesMock = jest.fn();
      getVisibleRecordsMock = jest.fn();
      setStartDateMock = jest.fn();
      setEndDateMock = jest.fn();

      const props = {
        expenses,
        income,
        filters,
        fetchUserExpenses: fetchUserExpensesMock,
        fetchUserIncomes: fetchUserIncomesMock,
        getVisibleRecords: getVisibleRecordsMock,
        setStartDate: setStartDateMock,
        setEndDate: setEndDateMock
      };

      wrapper = shallow(<Dashboard {...props} />);
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

    test("should run fetchUserExpenses on AdminDashboard mount", () => {
      wrapper.instance().componentDidMount();
      const mockFuncCallCount = fetchUserExpensesMock.mock.calls.length;
      expect(mockFuncCallCount).toBe(1);
    });

    test("should run fetchUserIncomes on AdminDashboard mount", () => {
      wrapper.instance().componentDidMount();
      const mockFuncCallCount = fetchUserIncomesMock.mock.calls.length;
      expect(mockFuncCallCount).toBe(1);
    });
  });
});
