import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../utils/testUtils";
import { DeleteUserList } from "./index";

describe("DeleteUserList component", () => {
  describe("Rendering (using unconnected component) when no errors", () => {
    let wrapper;
    const props = {
      users: [
        {
          _id: "1",
          name: "Simon"
        }
      ],
      adminDeleteUser: jest.fn(),
      successMsg: "",
      errorMsg: ""
    };

    beforeEach(() => {
      wrapper = shallow(<DeleteUserList {...props} />);
    });

    test("should render component without error", () => {
      const component = findByTestAttr(wrapper, "user-list");
      expect(component.length).toBe(1);
    });

    test("should render header", () => {
      const header = findByTestAttr(wrapper, "header");
      expect(header.length).toBe(1);
    });

    test("should render errorMsg container", () => {
      const errorContainer = findByTestAttr(wrapper, "error-container");
      expect(errorContainer.length).toBe(1);
    });

    test("should show successMsg when it exists", () => {
      wrapper.setProps({ successMsg: "It worked!" });
      const msg = findByTestAttr(wrapper, "message");
      expect(msg.length).toBe(1);
    });

    test("should show error message when it exists", () => {
      wrapper.setProps({ errorMsg: "Something went wrong" });
      const msg = findByTestAttr(wrapper, "message");
      expect(msg.length).toBe(1);
    });

    test("should render list items div", () => {
      const items = findByTestAttr(wrapper, "list-items");
      expect(items.length).toBe(1);
    });

    test("should not throw warning with expected props", () => {
      const expectedProps = props;
      checkProps(DeleteUserList, expectedProps);
    });
  });
});
