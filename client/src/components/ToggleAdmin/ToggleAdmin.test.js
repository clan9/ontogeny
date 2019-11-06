import React from 'react';
import {shallow } from 'enzyme';
import { findByTestAttr, checkProps, testStore} from '../../utils/testUtils';
import ConnectedToggleAdmin, {ToggleAdmin} from './index';

describe('ToggleAdmin component', () => {
  describe('Rendering', () => {
    let wrapper;
    let fetchUsersDetailsMock = jest.fn();
    let logoutMock = jest.fn();
    let users = [
      { _id: '1', name: 'Simon'},
      { _id: '2', name: 'Lee' }
    ];
    let props = {
      fetchUsersDetails: fetchUsersDetailsMock,
      logout: logoutMock,
      users,
    }

    beforeEach(() => {
      wrapper = shallow(<ToggleAdmin {...props} />); 
    });

    test('should render admin navbar', () => {
      const navbar = findByTestAttr(wrapper, 'navbar');
      expect(navbar.length).toBe(1);
    })

    test('should render component without error for admin user', () => {
      wrapper.setProps({ isAdmin: true });
      const component = findByTestAttr(wrapper, 'toggle-admin');
      expect(component.length).toBe(1);
    });

    test('should render ToggleAdminList for admin user', () => {
      wrapper.setProps({ isAdmin: true });
      const list = findByTestAttr(wrapper, 'list');
      expect(list.length).toBe(1);
    })

    test('should redirect to home page for non-admin user', () => {
      wrapper.setProps({ isAdmin: false });
      const redirectLink = findByTestAttr(wrapper, 'redirect');
      expect(redirectLink.length).toBe(1);
      expect(logoutMock).toHaveBeenCalled();
    });

    test('should call fetchUsersDetails on component mount', () => {
      wrapper.instance().componentDidMount();
      const mockFuncCallCount = fetchUsersDetailsMock.mock.calls.length;
      expect(mockFuncCallCount).toBe(1);
    });

    test('should not throw warning with expectedProps', () => {
      const expectedProps = props;
      checkProps(ToggleAdmin, expectedProps);
    })
  })
})
