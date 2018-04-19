import React from 'react';
import View from '../../../app/js/components/searchDrug/View';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<View {...props} />);
  }
  return mountedComponent;
};

describe('Component: searchDrug: View', () => {
  beforeEach(() => {
    props = {
      results: [
        { display: 'paracetamol', uuid: '1232h-2323' },
        { display: 'paraphenol', uuid: '8932h-2323' }
      ],
      loading: false,
      onChange: jest.fn(),
      storeToState: jest.fn(),
      onOptionSelected: jest.fn(),
      focused: false,
    };
    mountedComponent = undefined;
  });

  describe('Conditional rendering', () => {
    it('renders properly', () => {
      const component = getComponent();
      expect(component).toMatchSnapshot();
    });

    it('show Searching...', () => {
      props.loading = true;
      const component = getComponent().find('span').at(1);
      expect(component.props().children).toBe(' Searching...');
    });

    it('show search error...', () => {
      props.error = { data: { message: 'Network error' } };
      const component = getComponent().find('span').at(1);
      expect(component.props().children).toBe('Network error');
    });
  });

  describe('Drug Search input field', () => {
    it('calls onChange()', () => {
      const event = { target: { value: 'para' } };
      const searchDrugSpy = jest.spyOn(props, 'onChange');
      const drugSearchInput = getComponent().find('span input').first();
      drugSearchInput.simulate('change', event);
      expect(searchDrugSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Select drug action', () => {
    it('calls onOptionSelected()', () => {
      props.focused = true;
      const optionSelectedSpy = jest.spyOn(props, 'onOptionSelected');
      const drugSearchInput = getComponent().find('.option').first();
      drugSearchInput.simulate('click');
      expect(optionSelectedSpy).toHaveBeenCalledTimes(1);
    });
  });
});
