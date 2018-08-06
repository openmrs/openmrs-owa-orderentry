import React from 'react';
import SelectOrderType from '../../../app/js/components/orderEntry/SelectOrderType';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<SelectOrderType {...props} />);
  }
  return mountedComponent;
};

describe('Component: orderentry: SelectOrderType', () => {
  beforeEach(() => {
    props = { 
      currentOrderType: { id: 1, text: 'Test Orders' },
      switchOrderType: jest.fn(),
    };
    mountedComponent = undefined;
  });
  it('should render three buttons', () => {
    const component = getComponent();
    expect(component.find('button').length).toBe(2);
  });
  it('the current order type should have a border styling', () => {
    const component = getComponent();
    expect(component.find('button').first().hasClass('active')).toBeTruthy();
  }); 
  it('clicking the button should call switchOrderType', () => {
    const component = getComponent().find('button').first();
    component.simulate('click');
    expect(props.switchOrderType).toHaveBeenCalledTimes(1);
  });
});
