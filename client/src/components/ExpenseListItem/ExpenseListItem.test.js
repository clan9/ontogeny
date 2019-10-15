import React from "react";
import { shallow } from "enzyme";
import { checkProps, findByTestAttr } from "../../utils/testUtils";
import ExpenseListItem from "./index";
import expenses from "../../fixtures/expenses";

describe("Expense List Item ", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ExpenseListItem expense={expenses[0]} />);
  });

  test("should render without error", () => {
    const component = findByTestAttr(wrapper, "expense-component");
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
