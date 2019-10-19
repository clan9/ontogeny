import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../utils/testUtils";
import IncomeListItem from "./index";
import income from "../../fixtures/income";

describe("Income List Item", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<IncomeListItem income={income[0]} />);
  });

  test("should render without error", () => {
    const component = findByTestAttr(wrapper, "income-component");
    expect(component.length).toBe(1);
  });

  test("should render description/date div", () => {
    const descDateDiv = findByTestAttr(wrapper, "description-date-div");
    expect(descDateDiv.length).toBe(1);
  });

  test("should render h3 for description ", () => {
    const description = findByTestAttr(wrapper, "description");
    expect(description.length).toBe(1);
  });

  test("should render span with date", () => {
    const date = findByTestAttr(wrapper, "date");
    expect(date.length).toBe(1);
  });

  test("should render h3 with amount", () => {
    const amount = findByTestAttr(wrapper, "amount");
    expect(amount.length).toBe(1);
  });
});
