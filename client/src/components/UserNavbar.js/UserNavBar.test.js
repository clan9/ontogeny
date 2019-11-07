import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr, checkProps} from '../../utils/testUtils';
import {UserNavBar} from './index';


describe('UserNavbar component', () => {
  let wrapper;
  const logoutMock = jest.fn();
  const props = {
    logout: logoutMock
  };

  beforeEach(() => {
    wrapper = shallow(<UserNavBar {...props} />);
  });

  test('should render component without error', () => {
    const component = findByTestAttr(wrapper, 'user-navbar');
    expect(component.length).toBe(1);
  });

  test('should render link to main menu', () => {
    const menuLink = findByTestAttr(wrapper, 'menu-link');
    expect(menuLink.length).toBe(1);
  });

  test('should render logout link', () => {
    const logoutLink = findByTestAttr(wrapper, 'logout-link');
    expect(logoutLink.length).toBe(1);
  });

  test('should call logout action when logout link is clicked', () => {
    const logoutLink = findByTestAttr(wrapper, 'logout-link');
    logoutLink.simulate('click');
    expect(logoutMock).toHaveBeenCalled();
  });

  test('should not throw warning with expected props', () => {
    const expectedProps = { logout: jest.fn()  };
    checkProps(UserNavBar, expectedProps);
  });
});
