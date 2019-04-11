import React from 'react';

import connectedSearchAndAddOrder, {SearchAndAddOrder} from '../../../app/js/components/drugOrderEntry';

const { order } = mockData;
const props = {
  careSettingReducer: {
    outpatientCareSetting:{
      uuid: '',
      display: '',
    },
  },
  getPastOrders: jest.fn(),
  draftOrders: [],
  setOrderAction: jest.fn(),
  order,
  draftLabOrders: {orders: []},
  selectDrugSuccess: jest.fn(),
  fetchInpatientCareSetting: jest.fn(),
  fetchOutpatientCareSetting: jest.fn(),
  deleteDraftOrder: jest.fn(),
  deleteAllDraftOrders: jest.fn(),
  drug: "abc-e345-thed-uuid2345",
};

let mountedComponent;
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<SearchAndAddOrder {...props} />);
  }
  return mountedComponent;
};

describe('Test for Searching and Adding an order', () => {
  it('should render component', () => {
    expect(getComponent()).toMatchSnapshot()
  });
  it('should render component during edit activity', () => {
    const newProps = {
      ...props,
      selectedOrder: order,
      activity: 'EDIT',
    }
    const component = shallow(<SearchAndAddOrder {...newProps} />);
    expect(component).toMatchSnapshot();
  });
  it(`should set the details of an order in the state
     if activity is DRAFT_ORDER_EDIT and there is a selectedOrder`, () => {
      const newProps = {
        ...props,
        selectedOrder: { drug: '222-55-dddssd' },
        activity: 'DRAFT_ORDER_EDIT',
      };
      const component = shallow(<SearchAndAddOrder {...newProps} />);
      expect(component.state('editDrugUuid')).toEqual('222-55-dddssd');
  });
});

describe('componentDidUpdate method', () => {
  it(`should set the details of an order in the state
    if activity is DRAFT_ORDER_EDIT, there was no draftOrder in the state,
    and there is a selectedOrder`, () => {
      const component = getComponent();
      expect(component.state('draftOrder')).toEqual({});
      component.setProps({
        selectedOrder: { drug: '222-55-dddssd' }, 
        activity: 'DRAFT_ORDER_EDIT',
      });
      expect(component.state('draftOrder')).toEqual({ drug: '222-55-dddssd' });
  });
    it(`should update the details of the order in the state 
      if activity is DRAFT_ORDER_EDIT but the selectedOrder has changed`, () => {
      const component = getComponent();
      const newDrugUuid = '222-55-dddssd';
      component.setState({ editDrugUuid: '111-22-addaddd' }); 
      component.setProps({
        selectedOrder: { drug: newDrugUuid }, 
        activity: 'DRAFT_ORDER_EDIT',
      });
      expect(component.state('editDrugUuid')).toEqual(newDrugUuid);
    });
    it(`should clear the details of an order in the state
       if there is no selectedOrder`, () => {
        const component = getComponent();
        component.setState({ editDrugUuid: '111-22-addaddd' }); 
        component.setProps({ selectedOrder: null });
        expect(component.state('editDrugUuid')).toEqual('');
    });
});

describe('onSelectDrug() method', () => {
  it('sets state to value passed as argument', () => {
    const componentMethods = getComponent().instance();
    componentMethods.onSelectDrug("paracetamol");
    expect(getComponent().state('value')).toEqual("paracetamol");
    expect(getComponent().state('focused')).toEqual(false);
  });
});

describe('onChange() method', () => {
  it('should sets state to value passed as argument', () => {
    const componentMethods = getComponent().instance();
    componentMethods.onChange("paracetamol");
    expect(getComponent().state('value')).toEqual("paracetamol");
    expect(getComponent().state('focused')).toEqual(true);
  });
});

describe('clearSearchField() method', () => {
  it('resets the state of the component', () => {
    const componentMethods = getComponent().instance();
    componentMethods.clearSearchField();
    expect(getComponent().state()).toEqual({
      ...getComponent().state(),
      editDrugUuid: '',
      editDrugName: '',
      editOrder: {},
    });
  });
});

describe('handleEditActiveDrugOrder() method', () => {
  const details = {
    props:{
      children:[
        `New Drug: (This is a free text edit order This is a free text edit order
        This is a free text test order This is a free text test order This is a free text test order
        This is a free text test order This is a free text test order This is a free text test order
        This is a free text test order This is a free text test order
        This is a free text test order This is a free text test order) (Dispense: 1 Nebulizer)`
      ]
    }
  }
  it('sets state to value in props', () => {
    const componentMethods = getComponent().instance();
    componentMethods.handleEditActiveDrugOrder(order,details);
    expect(getComponent().state('formattedDetails').length).toBeGreaterThan(250)
    expect(getComponent().state()).toEqual({
      ...getComponent().state(),
      editDrugUuid: '',
      editDrugName: '',
      editOrder: order,
    });
  });
});

describe('removeOrder() method', () => {
  it('resets the draftOrder and editOrder values in state', () => {
    const componentMethods = getComponent().instance();
    componentMethods.removeOrder();
    expect(getComponent().state()).toEqual({
      ...getComponent().state(),
      draftOrder: {},
      editOrder: {},
    });
  });
});

describe('handleEditDraftOrder() method', () => {
  it('sets draftOrder value in state to parsed argument', () => {
    const componentMethods = getComponent().instance();
    componentMethods.handleEditDraftOrder(order);
    expect(getComponent().state('draftOrder')).toEqual(order);
  });
});

const setup = () => {
  const wrapper = shallow(<SearchAndAddOrder {...props} store={store} />);
  return { wrapper }
}

describe('handleDiscardOneOrder', () => {
  it('should be called on discarding one draft order', () => {
    const order2 = {
      uuid: '',
      drugName: { drug: { display: '' } },
      action: 'DISCONTINUE',
      dose: '',
      dosingUnit: '',
      orderNumber: '',
    };
    const { wrapper } = setup();

    wrapper.instance().handleDiscardOneOrder(order2);
  });
  it('should call setOrderAction with DISCARD_EDIT argument if action is REVISE', () => {
    const order = {
      action: 'REVISE',
      orderNumber: '4',
      // A valid order object still has more properties.
    };
    const componentInstance = getComponent().instance();
    props.setOrderAction.mockReset();
    expect(props.setOrderAction).toBeCalledTimes(0);
    componentInstance.handleDiscardOneOrder(order);
    expect(props.setOrderAction).toBeCalledWith('DISCARD_EDIT', order.orderNumber);
  });
  it('should call setOrderAction with DISCARD_ONE argument if action is not REVISE', () => {
    const order = {
      action: 'SOME_OTHER_ACTION',
      orderNumber: '4',
      // A valid order object still has more properties.
    };
    const componentInstance = getComponent().instance();
    props.setOrderAction.mockReset();    
    expect(props.setOrderAction).toBeCalledTimes(0);
    componentInstance.handleDiscardOneOrder(order);
    expect(props.setOrderAction).toBeCalledWith('DISCARD_ONE', order.orderNumber);
  });
});

describe('Test for Searching and Adding an order', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
