import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps, testStore } from "../../utils/testUtils";
import income from "../../fixtures/income";
import { filters } from "../../fixtures/filters";
import ConnectedIncomeList, { IncomeList } from "./index";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedIncomeList store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("Income List component", () => {
  describe("Rendering (connected component)", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render component without error", () => {
      const component = findByTestAttr(wrapper, "income-list-component");
      expect(component.length).toBe(1);
    });

    test("should render `no incomes` message when income is an empty array", () => {
      const msg = findByTestAttr(wrapper, "no-incomes-msg");
      expect(msg.length).toBe(1);
    });

    test("should not render `no incomes` message when there is income data in state", () => {
      wrapper = setup({ income });
      const msg = findByTestAttr(wrapper, "no-incomes-msg");
      expect(msg.length).toBe(0);
    });
  });

  describe("Redux props", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({ income, filters });
    });

    test("should receive filtered incomes from mapStateToProps", () => {
      const incomeProp = wrapper.instance().props.income;
      expect(incomeProp.length).toBe(3);
      expect(incomeProp).toEqual([income[1], income[0], income[2]]);
    });

    test("should have access to the fetchUserIncomes function as a prop", () => {
      const fetchIncomeProp = wrapper.instance().props.fetchUserIncomes;
      expect(fetchIncomeProp).toBeInstanceOf(Function);
    });

    test("should render income list items when income array not empty", () => {
      const incomeListItems = findByTestAttr(wrapper, "income-list-item");
      expect(incomeListItems.length).toBe(3);
    });
  });

  // UNCONNECTED COMPONENT
  describe("Check prop types & lifecycle method call with unconnected component", () => {
    let fetchUserIncomesMock, expectedProps;

    beforeEach(() => {
      fetchUserIncomesMock = jest.fn();

      expectedProps = {
        income,
        fetchUserIncomes: fetchUserIncomesMock
      };
    });

    test("should not throw warning with expected props", () => {
      checkProps(IncomeList, expectedProps);
    });

    test("should call fetchUserIncomes on component mount", () => {
      const wrapper = shallow(<IncomeList {...expectedProps} />);
      wrapper.instance().componentDidMount();
      const mockFuncCallCount = fetchUserIncomesMock.mock.calls.length;
      expect(mockFuncCallCount).toBe(1);
    });
  });
});
