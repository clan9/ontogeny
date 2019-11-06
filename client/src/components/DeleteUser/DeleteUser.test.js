import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, testStore, checkProps } from '../../utils/testUtils';
import ConnectedDeleteUser, {DeleteUser} from './index';
import { fetchUsersDetails, logout, adminDeleteUser, adminDeleteSelf } from '../../actions/user/user';
import {DeleteUserList} from '../DeleteUserList';

const setup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedDeleteUser store={store} />).dive().dive();
  return wrapper;
};

describe('DeleteUser component', () => {
  describe('Component rendering (connected component)', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test('should render component without error', () => {
      const component = findByTestAttr(wrapper, 'delete-user');
      expect(component.length).toBe(1);
    });

  })

  // Unconnected Component
  describe('Check prop types and lifecycle method', () => {
    let expectedProps; 
    let fetchUsersDetailsMock;
    let logoutMock;
    let adminDeleteUserMock;
    let adminDeleteSelfMock;

    beforeEach(() => {
      fetchUsersDetailsMock = jest.fn();
      logoutMock = jest.fn();
      adminDeleteUserMock = jest.fn();
      adminDeleteSelfMock = jest.fn();

      expectedProps = {
        fetchUsersDetails: fetchUsersDetailsMock,
        logout: logoutMock,
        adminDeleteUser: adminDeleteUserMock,
        adminDeleteSelf: adminDeleteSelfMock,
        allUsers: [],
        currentAdminUser: {},
        error: ''
      }
    });

    test('should not throw warning with expected props', () => {
      checkProps(DeleteUser, expectedProps);
    });

    test('should run fetchUsersDetails on component mount', () => {
      const wrapper = shallow(<DeleteUser {...expectedProps} />);
      wrapper.instance().componentDidMount();
      const mockFuncCallCount = fetchUsersDetailsMock.mock.calls.length;
      expect(mockFuncCallCount).toBe(1);
    }) 
  })
})









































