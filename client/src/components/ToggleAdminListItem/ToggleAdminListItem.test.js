import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../utils/testUtils';
import {ToggleAdminListItem} from './index';

describe('ToggleAdminListItem component', () => {
    let wrapper;
    let toggleAdminMock = jest.fn();
    const users = [
      {
        _id: '1',
        name: 'Simon',
        isAdmin: true,
        email: 's@test.com'
      },
      {
      
        _id: '2',
        name: 'Lee',
        isAdmin: false,
        email: 'l@test.com'
      }
    ];
  describe('Component rendering for admin user', () => {

    beforeEach(() => {
      wrapper = shallow(<ToggleAdminListItem user={users[0]} />);
    })

    test('should render component without error for admin user', () => {
      const component = findByTestAttr(wrapper, 'admin-list-item');
      expect(component.length).toBe(1);
    });

    test('should render user info text', () => {
      const userInfo = findByTestAttr(wrapper, 'user-info');
      expect(userInfo.length).toBe(1);
    });

    test('should render toggle admin status button', () => {
      const button = findByTestAttr(wrapper, 'toggle-button');
      expect(button.length).toBe(1);
    });

    test('should call toggleAdmin action when button clicked', () => {
      wrapper.setProps({ toggleAdmin: toggleAdminMock });
      const button = findByTestAttr(wrapper, 'toggle-button');
      button.simulate('click');
      expect(toggleAdminMock).toHaveBeenCalled();
    })
  });

  describe('Component rendering for non-admin user', () => {

    beforeEach(() => {
      wrapper = shallow(<ToggleAdminListItem user={users[1]} />);
    })

    test('should render component without error for admin user', () => {
      const component = findByTestAttr(wrapper, 'admin-list-item');
      expect(component.length).toBe(1);
    });

    test('should render user info text', () => {
      const userInfo = findByTestAttr(wrapper, 'user-info');
      expect(userInfo.length).toBe(1);
    });


    test('should render toggle admin status button', () => {
      const button = findByTestAttr(wrapper, 'toggle-button');
      expect(button.length).toBe(1);
    });

    test('should call toggleAdmin action when button clicked', () => {
      wrapper.setProps({ toggleAdmin: toggleAdminMock });
      const button = findByTestAttr(wrapper, 'toggle-button');
      button.simulate('click');
      expect(toggleAdminMock).toHaveBeenCalled();
    })
  });

  describe('Prop types check', () => {
    test('should not throw warning with expected props', () => {
      const expectedProps = {
        user: users[1],
        toggleAdmin: jest.fn()
      };

      checkProps(ToggleAdminListItem, expectedProps);
    });
  });
  
});

































