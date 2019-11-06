import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../utils/testUtils";
import DeleteUserListItem from "./index";

describe("DeleteUserListItem component", () => {
  describe("Component Rendering", () => {
    let wrapper;
    let adminDeleteUserMock = jest.fn();
    const props = {
      user: {
        _id: "1",
        name: "Simon"
      },
      adminDeleteUser: adminDeleteUserMock
    };

    beforeEach(() => {
      wrapper = shallow(<DeleteUserListItem {...props} />);
    });

    test("should render component without error", () => {
      const component = findByTestAttr(wrapper, "list-item");
      expect(component.length).toBe(1);
    });

    test('should render username paragraph', () => {
      const username = findByTestAttr(wrapper, 'user-name');
      expect(username.length).toBe(1);
    })

    test('should render delete user button', () => {
      const button = findByTestAttr(wrapper, 'delete-button');
      expect(button.length).toBe(1);
    }) 

    test('should call adminDeleteUser when button clicked', () => {
      const button = findByTestAttr(wrapper, 'delete-button');
      button.simulate('click');
      const mockFuncCallCount = adminDeleteUserMock.mock.calls.length;
      expect(mockFuncCallCount).toBe(1);
    })

    test('should not throw warning with expected props', () => {
      const expectedProps = props;

      checkProps(DeleteUserListItem, expectedProps);
    })

  });
});






























