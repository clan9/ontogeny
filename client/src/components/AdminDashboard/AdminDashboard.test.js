import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps, testStore } from "../../utils/testUtils";
import ConnectedAdminDashboard, { AdminDashboard } from "./index";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import { filters } from "../../fixtures/filters";
import expenses from "../../fixtures/expenses";
import income from "../../fixtures/income";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedAdminDashboard store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("AdminDashboard component", () => {
  describe("Component rendering (connected component)", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render component without error", () => {
      const component = findByTestAttr(wrapper, "admin-dash-component");
      expect(component.length).toBe(1);
    });

    test("should render header", () => {
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

    test("should render stats for all users section ", () => {
      const allUsersInfo = findByTestAttr(wrapper, "stats-all-users");
      expect(allUsersInfo.length).toBe(1);
    });

    test("should render sub-heading", () => {
      const subHeading = findByTestAttr(wrapper, "sub-heading-1");
      expect(subHeading.length).toBe(1);
    });

    test("should render doughnut chart for all users", () => {
      const chart = findByTestAttr(wrapper, "doughnut-all-users");
      expect(chart.length).toBe(1);
    });

    test("should render bar chart for all users", () => {
      const chart = findByTestAttr(wrapper, "barchart-all-users");
      expect(chart.length).toBe(1);
    });

    test("should render line chart for all users", () => {
      const chart = findByTestAttr(wrapper, "linechart-all-users");
      expect(chart.length).toBe(1);
    });

    test("should render stats for by-user section ", () => {
      const perUserInfo = findByTestAttr(wrapper, "stats-per-user");
      expect(perUserInfo.length).toBe(1);
    });

    test("should render sub-heading", () => {
      const subHeading = findByTestAttr(wrapper, "sub-heading-2");
      expect(subHeading.length).toBe(1);
    });

    test("should render doughnut chart for each user", () => {
      const chart = findByTestAttr(wrapper, "doughnut-user");
      expect(chart.length).not.toBeNull();
    });

    test("should render bar chart for each user", () => {
      const chart = findByTestAttr(wrapper, "barchart-user");
      expect(chart.length).not.toBeNull();
    });

    test("should render line chart for each user", () => {
      const chart = findByTestAttr(wrapper, "linechart-user");
      expect(chart).not.toBeNull();
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
      expect(expensesProps).toEqual([expenses[1], expenses[0], expenses[2]]);
    });

    test("should have access to income array as a prop", () => {
      const incomeProps = wrapper.instance().props.income;
      expect(incomeProps).toEqual([income[1], income[0], income[2]]);
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
        fetchAllIncomes: jest.fn(),
        fetchAllExpenses: jest.fn(),
        getTotal: jest.fn(),
        getVisibleRecords: jest.fn(),
        setStartDate: jest.fn(),
        setEndDate: jest.fn(),
        expenses,
        income,
        filters,
        expensesTotal: 25999,
        incomeTotal: 58999
      };

      checkProps(AdminDashboard, expectedProps);
    });
  });

  describe("Action creator calls", () => {
    let wrapper,
      fetchAllExpensesMock,
      fetchAllIncomesMock,
      getTotalMock,
      getVisibleRecordsMock,
      setStartDateMock,
      setEndDateMock;

    beforeEach(() => {
      fetchAllExpensesMock = jest.fn();
      fetchAllIncomesMock = jest.fn();
      getTotalMock = jest.fn();
      getVisibleRecordsMock = jest.fn();
      setStartDateMock = jest.fn();
      setEndDateMock = jest.fn();

      const props = {
        expenses,
        income,
        filters,
        fetchAllExpenses: fetchAllExpensesMock,
        fetchAllIncomes: fetchAllIncomesMock,
        getTotal: getTotalMock,
        getVisibleRecords: getVisibleRecordsMock,
        setStartDate: setStartDateMock,
        setEndDate: setEndDateMock
      };

      wrapper = shallow(<AdminDashboard {...props} />);
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

    test("should run fetchAllExpenses on AdminDashboard mount", () => {
      wrapper.instance().componentDidMount();
      const mockFuncCallCount = fetchAllExpensesMock.mock.calls.length;
      expect(mockFuncCallCount).toBe(1);
    });

    test("should run fetchAllIncomes on AdminDashboard mount", () => {
      wrapper.instance().componentDidMount();
      const mockFuncCallCount = fetchAllIncomesMock.mock.calls.length;
      expect(mockFuncCallCount).toBe(1);
    });
  });
});
