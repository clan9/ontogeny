import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../utils/testUtils";
import Landing from "./index";

const setup = (props = {}) => {
  const component = shallow(<Landing {...props} />);
  return component;
};

describe("Landing component", () => {
  let component;

  beforeEach(() => {
    component = setup();
  });

  test("should render without errors", () => {
    const wrapper = findByTestAttr(component, "landing-component");
    // console.log(wrapper.debug());
    expect(wrapper.length).toBe(1);
  });

  test("should render welcome message", () => {
    const welcomeMsg = findByTestAttr(component, "welcome");
    expect(welcomeMsg.length).toBe(1);
  });

  test("should render signup button", () => {
    const signupButton = findByTestAttr(component, "signup");
    // console.log(signupButton.debug());
    expect(signupButton.length).toBe(1);
  });

  test("should render signin button", () => {
    const signinButton = findByTestAttr(component, "signin");
    expect(signinButton.length).toBe(1);
  });

  test("should render admin button", () => {
    const adminButton = findByTestAttr(component, "admin");
    expect(adminButton.length).toBe(1);
  });
});
