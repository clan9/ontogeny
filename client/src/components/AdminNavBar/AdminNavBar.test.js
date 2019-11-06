import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps, testStore } from '../../utils/testUtils';
import ConnectedAdminNavBar, { AddExpense } from './index';

const setup = ( initialState = {} ) => {
  const store = testStore(initialState);
  const wrapper = shallow(<ConnectedAdminNavBar store={store} />).dive();
  return wrapper;
}

describe('AdminNavBar component', () => {
  describe('Component rendering', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test('Should render Component without error', () => {
      const component = findByTestAttr(wrapper, 'adminNavBar');
      expect(component.length).toBe(1);
    })
  })
})
