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
  location:{
    search: '',
  },
  dateFormatReducer: {
    dateFormat: 'DD-MMM-YYYY HH:mm',
  },
  order,
  selectDrugSuccess: jest.fn(),
  fetchInpatientCareSetting: jest.fn(),
  fetchOutpatientCareSetting: jest.fn(),
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
  it('should call onSelectDrug()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'onSelectDrug');
    renderedComponent.onSelectDrug("paracetamol");
    expect(renderedComponent.onSelectDrug.calledOnce).toEqual(true);
    expect(getComponent().state('value')).toEqual("paracetamol");
    expect(getComponent().state('focused')).toEqual(false);
  });
});

describe('onChange() method', () => {
  it('should call onChange()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'onChange');
    renderedComponent.onChange("paracetamol");
    expect(renderedComponent.onChange.calledOnce).toEqual(true);
    expect(getComponent().state('value')).toEqual("paracetamol");
    expect(getComponent().state('focused')).toEqual(true);
  });
});

describe('clearSearchField() method', () => {
  it('should call clearSearchField()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'clearSearchField');
    renderedComponent.clearSearchField();
    expect(renderedComponent.clearSearchField.calledOnce).toEqual(true);
    expect(getComponent().state('editDrugUuid')).toEqual("");
    expect(getComponent().state('editDrugName')).toEqual("");
    expect(getComponent().state('editOrder')).toEqual({});
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
  it('should call handleEditActiveDrugOrder()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'handleEditActiveDrugOrder');
    renderedComponent.handleEditActiveDrugOrder(order,details);
    expect(getComponent().state('formattedDetails').length).toBeGreaterThan(250)
    expect(renderedComponent.handleEditActiveDrugOrder.calledOnce).toEqual(true);
    expect(getComponent().state('editDrugUuid')).toEqual("");
    expect(getComponent().state('editDrugName')).toEqual("");
    expect(getComponent().state('editOrder')).toEqual(order);
  });
});

describe('removeOrder() method', () => {
  it('should call removeOrder()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'removeOrder');
    renderedComponent.removeOrder();
    expect(renderedComponent.removeOrder.calledOnce).toEqual(true);
    expect(getComponent().state('editOrder')).toEqual({});
  });
});

describe('closeFormsOnTabChange() method', () => {
  it('should call closeFormsOnTabChange()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'closeFormsOnTabChange');
    renderedComponent.closeFormsOnTabChange();
    expect(renderedComponent.closeFormsOnTabChange.calledOnce).toEqual(true);
  });
});


const setup = () => {
  const wrapper = shallow(<SearchAndAddOrder {...props} store={store} />);
  return { wrapper }
}

describe('Test for Searching and Adding an order', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

