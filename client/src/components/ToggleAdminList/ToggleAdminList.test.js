import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps, testStore } from '../../utils/testUtils';
import  {ToggleAdminList} from './index';


describe('ToggleAdminList component', () => {
  describe('Component rendering', () => {
    let wrapper;
    const users = [
      { _id: '1', name: 'Simon'  }
    ];
    const props = {users}

    beforeEach(() => {
      wrapper = shallow(<ToggleAdminList {...props} />);
    })

    test('should render component without error', () => {
      const component = findByTestAttr(wrapper, 'admin-list');
      expect(component.length).toBe(1);
    });

    test('should render header', () => {
      const header = findByTestAttr(wrapper, 'header');
      expect(header.length).toBe(1);
    });

    test('should render message container div', () => {
      const container = findByTestAttr(wrapper, 'message-container');
      expect(container.length).toBe(1);
    });

    test('should render message when there is a successMsg prop', () => {
      wrapper.setProps({ successMsg: 'It worked' });
      const msg = findByTestAttr(wrapper, 'message');
      expect(msg.length).toBe(1);
    });

    test('should render message when there is an errorMsg prop', () => {
      wrapper.setProps({ errorMsg: 'Something went wrong'});
      const msg = findByTestAttr(wrapper, 'message');
      expect(msg.length).toBe(1);
    });

    test('should render list items div', () => {
      const listItems = findByTestAttr(wrapper, 'list-items');
      expect(listItems.length).toBe(1);
    }); 

    test('should render list item component', () => {
      const listItem = findByTestAttr(wrapper, 'list-item');
      expect(listItem.length).toBe(1);
    });


    test('should not throw warning with expected props', () => {
      const expectedProps = {
        users: [],
        successMsg: '',
        errorMsg: ''
      };

      checkProps(ToggleAdminList, expectedProps);
    })

  })
})







































