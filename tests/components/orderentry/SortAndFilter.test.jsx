import React from 'react';
import { SortAndFilter } from '../../../app/js/components/orderEntry/SortAndFilter';
import { Provider } from 'react-redux';

const store = mockStore({})
const props = {
  sortAndFilterAction: jest.fn(),
}
const wrapper = shallow(<SortAndFilter {...props} />);

describe('sort and Filter component test-suite', () => {
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('fires an action when the select button value is changed', () => {
    const selectElement = wrapper.find('select').at(0)
    selectElement.simulate('change', { target: { value: 'testorder' }});
    expect(props.sortAndFilterAction).toHaveBeenCalledWith('type', 'testorder');
  });
});
