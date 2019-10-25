import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, testStore, checkProps } from "../../utils/testUtils";
import ConnectedSigninAdmin, { SigninAdmin } from "./index";

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedSigninAdmin store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("SignInAdmin component", () => {
  describe("Component rendering and updating (connected component)", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render component without error", () => {
      const component = findByTestAttr(wrapper, "signinAdmin-component");
      expect(component.length).toBe(1);
    });

    test("should render page header", () => {
      const header = findByTestAttr(wrapper, "page-header");
      expect(header.length).toBe(1);
    });

    test("should render email field", () => {
      const emailField = findByTestAttr(wrapper, "emailField");
      expect(emailField.length).toBe(1);
    });

    test("should update email field correctly", () => {
      const value = "sim@test.com";
      const emailField = findByTestAttr(wrapper, "emailField");
      emailField.simulate("change", {
        target: { value }
      });
      expect(wrapper.state("email")).toBe(value);
    });

    test("should render password field", () => {
      const passwordField = findByTestAttr(wrapper, "passwordField");
      expect(passwordField.length).toBe(1);
    });

    test("should update password field correctly", () => {
      const value = "pw1234";
      const passwordField = findByTestAttr(wrapper, "passwordField");
      passwordField.simulate("change", {
        target: { value }
      });
      expect(wrapper.state("password")).toBe(value);
    });

    test("should render sign in button", () => {
      const signInAdminButton = findByTestAttr(wrapper, "signInAdminButton");
      expect(signInAdminButton.length).toBe(1);
    });
  });

  describe("Redux props", () => {
    test("should receive serverErrorMsg (from mapStateToProps) as a prop", () => {
      const serverErrorMsg = "Unable to log in";
      const wrapper = setup({
        user: {
          error: serverErrorMsg,
          isAuthenticated: false
        }
      });
      const serverErrorProp = wrapper.instance().props.serverErrorMsg;
      expect(serverErrorProp).toBe(serverErrorMsg);
    });

    test("should receive isAuthenticated (from mapStateToProps) as a props", () => {
      const isAuthenticated = false;
      const wrapper = setup({
        user: { isAuthenticated }
      });
      const isAuthProp = wrapper.instance().props.isAuthenticated;
      expect(isAuthProp).toBe(isAuthenticated);
    });

    test("should have signInAdmin action as a function on props", () => {
      const wrapper = setup();
      const signInAdminProp = wrapper.instance().props.signInAdmin;
      expect(signInAdminProp).toBeInstanceOf(Function);
    });
  });

  // TESTING UNCONNECTED COMPONENT
  describe("form submission", () => {
    describe("check prop types", () => {
      test("should not throw warning with expected props", () => {
        const expectedProps = {
          serverErrorMsg: "",
          isAuthenticated: false,
          signInAdmin: jest.fn()
        };
        checkProps(SigninAdmin, expectedProps);
      });
    });

    describe("when form submitted with valid data", () => {
      let signInAdminMock;
      let wrapper;

      beforeEach(() => {
        signInAdminMock = jest.fn();

        const props = {
          signInAdmin: signInAdminMock,
          isAuthenticated: false
        };

        // Setup signInAdmin component with above props
        wrapper = shallow(<SigninAdmin {...props} />);

        // Setup component state
        wrapper.setState({
          email: "sim@test.com",
          password: "pw1234"
        });

        // Simulate form submission event
        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
      });

      test("should have empty errorMsg in state for valid form submission", () => {
        expect(wrapper.state("errorMsg")).toBe("");
      });

      test("should call signinAdmin action creator ONCE with correct data", () => {
        expect(signInAdminMock.mock.calls.length).toBe(1);
        expect(signInAdminMock).toHaveBeenLastCalledWith({
          email: "sim@test.com",
          password: "pw1234"
        });
      });
    });

    describe("when form submitted with invalid data", () => {
      let signInAdminMock;
      let wrapper;

      beforeEach(() => {
        signInAdminMock = jest.fn();

        const props = {
          signInAdmin: signInAdminMock,
          isAuthenticated: false
        };

        // Setup SigninAdmin component with above props
        wrapper = shallow(<SigninAdmin {...props} />);
      });

      test("should set correct error message on state when blank form submitted", () => {
        wrapper.setState({});
        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        expect(wrapper.state("errorMsg")).toBe(
          "Please provide your email and password"
        );
      });

      test("should set correct error message on state when invalid email address provided", () => {
        wrapper.setState({ email: "duffEmail", password: "pw1234" });
        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        expect(wrapper.state("errorMsg")).toBe(
          "Please provide a valid email address"
        );
      });

      test("should display error message paragraph on form when there is an error in component state", () => {
        wrapper.setState({
          email: "duffEmail",
          password: "pw1234"
        });
        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        const paragraph = findByTestAttr(wrapper, "error-paragraphOne");
        expect(paragraph.length).toBe(1);
      });

      test("should display error message paragraph on form when there is an error in application state (log in server error)", () => {
        // wrapper.setState({ email: "s@test.com", password: "pw1234" });
        // wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        wrapper.setProps({ serverErrorMsg: "Unable to log in" });
        const paragraph = findByTestAttr(wrapper, "error-paragraphTwo");
        expect(paragraph.length).toBe(1);
      });
    });

    describe("after valid form submission", () => {
      test("should not display form if user has been authenticated", () => {
        const wrapper = shallow(<SigninAdmin isAuthenticated={true} />);
        const component = findByTestAttr(wrapper, "signinAdmin-component");
        expect(component.length).toBe(0);
      });
    });
  });
});
