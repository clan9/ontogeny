import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, testStore, checkProps } from "../../utils/testUtils";
import ConnectedSignup, { Signup } from "./index";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedSignup store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("Signup component", () => {
  describe("Component rendering and updating (connected version of component)", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render form without error", () => {
      const component = findByTestAttr(wrapper, "signup-component");
      expect(component.length).toBe(1);
    });

    test("should render page header", () => {
      const header = findByTestAttr(wrapper, "page-header");
      expect(header.length).toBe(1);
    });

    test("should render input field for name", () => {
      const nameField = findByTestAttr(wrapper, "nameField");
      expect(nameField.length).toBe(1);
    });

    test("should update the name field correctly", () => {
      const value = "Test";
      const nameField = findByTestAttr(wrapper, "nameField");
      nameField.simulate("change", {
        target: { value }
      });
      expect(wrapper.state("name")).toBe(value);
    });

    test("should render input field for email", () => {
      const emailField = findByTestAttr(wrapper, "emailField");
      expect(emailField.length).toBe(1);
    });

    test("should update the email field correctly", () => {
      const value = "test@test.com";
      const emailField = findByTestAttr(wrapper, "emailField");
      emailField.simulate("change", {
        target: { value }
      });
      expect(wrapper.state("email")).toBe(value);
    });

    test("should render input field for password input ", () => {
      const passwordField = findByTestAttr(wrapper, "passwordFieldOne");
      expect(passwordField.length).toBe(1);
    });

    test("should update first password field correctly", () => {
      const value = "test123";
      const passwordField = findByTestAttr(wrapper, "passwordFieldOne");
      passwordField.simulate("change", {
        target: { value }
      });
      expect(wrapper.state("passwordOne")).toBe(value);
    });

    test("should render input field for password confirmation", () => {
      const passwordField = findByTestAttr(wrapper, "passwordFieldTwo");
      expect(passwordField.length).toBe(1);
    });

    test("should update second password field correctly", () => {
      const value = "test123";
      const passwordField = findByTestAttr(wrapper, "passwordFieldTwo");
      passwordField.simulate("change", {
        target: { value }
      });
      expect(wrapper.state("passwordTwo")).toBe(value);
    });

    test("should render submit button", () => {
      const button = findByTestAttr(wrapper, "submitButton");
      expect(button.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    test("should receive any serverErrorMsg (from mapStateToProps) as a prop", () => {
      const serverErrorMsg = "Unable to log in";
      const wrapper = setup({
        user: { error: serverErrorMsg, isAuthenticated: false }
      });
      const serverErrorProps = wrapper.instance().props.serverErrorMsg;
      expect(serverErrorProps).toBe(serverErrorMsg);
    });

    test("should receive user.isAuthenticated as a prop", () => {
      const isAuthenticated = true;
      const wrapper = setup({
        user: {
          isAuthenticated
        }
      });
      const authProps = wrapper.instance().props.isAuthenticated;
      expect(authProps).toBe(isAuthenticated);
    });

    test("should have registerUser action available as a function on the props", () => {
      const wrapper = setup();
      const registerUserProp = wrapper.instance().props.registerUser;
      expect(registerUserProp).toBeInstanceOf(Function);
    });
  });

  // TESTING UNCONNECTED COMPONENT
  describe("registerUser action creator call on form submission", () => {
    describe("Check prop types", () => {
      test("should not throw warning with expected props", () => {
        const expectedProps = {
          registerUser: jest.fn(),
          serverErrorMsg: "",
          isAuthenticated: false
        };

        checkProps(Signup, expectedProps);
      });
    });

    describe("when form submitted with valid data", () => {
      let registerUserMock;
      let wrapper;

      beforeEach(() => {
        registerUserMock = jest.fn();

        const props = {
          registerUser: registerUserMock,
          isAuthenticated: false
        };

        // setup Signup component with the above props
        wrapper = shallow(<Signup {...props} />);

        // setup component state
        wrapper.setState({
          name: "Simon",
          email: "simon@test.com",
          passwordOne: "pw1234",
          passwordTwo: "pw1234"
        });

        // Simulate for submission event
        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
      });

      test("should have empty errorMsg for valid form submission", () => {
        expect(wrapper.state("errorMsg")).toBe("");
      });

      test("should call registerUser with correct data", () => {
        expect(registerUserMock).toHaveBeenLastCalledWith({
          name: "Simon",
          email: "simon@test.com",
          password: "pw1234"
        });
      });
    });

    describe("when form submitted with invalid data", () => {
      let registerUserMock;
      let wrapper;

      beforeEach(() => {
        registerUserMock = jest.fn();

        const props = {
          registerUser: registerUserMock,
          isAuthenticated: false
        };

        // setup Signup component with the above props
        wrapper = shallow(<Signup {...props} />);
      });

      test("should update state error msg when blank form submitted", () => {
        wrapper.setState({});
        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        expect(wrapper.state("errorMsg")).toBe(
          "Please provide a name, email address and password"
        );
      });

      test("should update state error msg when email invalid", () => {
        wrapper.setState({
          name: "Simon",
          email: "wrong"
        });

        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        expect(wrapper.state("errorMsg")).toBe(
          "Please provide a valid email address"
        );
      });

      test("should update state error msg when passwords do not match", () => {
        wrapper.setState({
          name: "Simon",
          email: "simon@test.com",
          passwordOne: "pw1234",
          passwordTwo: "something else"
        });

        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        expect(wrapper.state("errorMsg")).toBe("Passwords do not match");
      });

      test("should display error message paragraph on form when there is an error in component state", () => {
        wrapper.setState({
          name: "Simon",
          email: "simon@test.com",
          passwordOne: "pw1234",
          passwordTwo: "something else"
        });
        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        const paragraph = findByTestAttr(wrapper, "error-paragraphOne");
        expect(paragraph.length).toBe(1);
      });

      test("should display error message paragraph on form when there is an error in application state (log in server error)", () => {
        wrapper.setState({ email: "s@test.com", password: "pw1234" });
        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        wrapper.setProps({ serverErrorMsg: "Unable to log in" });
        const paragraph = findByTestAttr(wrapper, "error-paragraphTwo");
        expect(paragraph.length).toBe(1);
      });
    });

    describe("after form has been successfully submitted", () => {
      test("should not render form once user is Authenticated", () => {
        const wrapper = shallow(<Signup isAuthenticated={true} />);
        const component = findByTestAttr(wrapper, "signup-component");
        expect(component.length).toBe(0);
      });
    });
  });
});
