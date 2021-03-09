import React from 'react';
import configureStore from 'redux-mock-store';
import SelectOrderType from '../../../app/js/components/orderEntry/SelectOrderType';

let props;
let mountedComponent;

const mockStore = configureStore();

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mount(<SelectOrderType {...props}  store={store} />);
  }
  return mountedComponent;
};

describe('Component: orderentry: SelectOrderType', () => {
  beforeEach(() => {
    store = mockStore({
      contextReducer: {}
    })

    props = {
      currentOrderType: { id: 1, text: 'Test Orders' },
      switchOrderType: jest.fn(),
      store: store
    };
    mountedComponent = undefined;
  });
  it('should render two dropdown type navs', () => {
    const component = getComponent();
    expect(component.find('.order-type-option').length).toBe(2);
  });
  it('the current order type should have a border styling', () => {
    const component = getComponent();
    expect(component.find('.order-type-option').first().hasClass('active')).toBeTruthy();
  });
  it('clicking the button should call switchOrderType', () => {
    const component = getComponent().find('.order-type-option').first();
    component.simulate('click');
    expect(props.switchOrderType).toHaveBeenCalledTimes(1);
  });
});
