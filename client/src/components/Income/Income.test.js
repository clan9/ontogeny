import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../utils/testUtils";
import Income from "./index";

describe("Income Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Income />);
  });

  test("should render component without error", () => {
    const component = findByTestAttr(wrapper, "income-component");
    expect(component.length).toBe(1);
  });

  test("should render summary component", () => {
    const summary = findByTestAttr(wrapper, "summary");
    expect(summary.length).toBe(1);
  });

  test("should render filters component", () => {
    const filters = findByTestAttr(wrapper, "filters");
    expect(filters.length).toBe(1);
  });

  test("should render list component", () => {
    const list = findByTestAttr(wrapper, "list");
    expect(list.length).toBe(1);
  });
});
