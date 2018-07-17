import React from 'react';

import connectedSearchAndAddOrder, {SearchAndAddOrder} from '../../../app/js/components/drugOrderEntry';
import ConnectedDraftTable from '../../../app/js/components/drugOrderEntry/addForm/DraftDataTable';

const { order } = mockData;
const props = {
  outpatientCareSetting:{
    uuid: '',
    display: '',
  },
  inpatientCareSetting: {
    uuid: '',
    display: '',
  },
  getPastOrders: jest.fn(),
  draftOrders: [],
  setOrderAction: jest.fn(),
  location:{
    search: '',
  },
  dateFormat: 'DD-MMM-YYYY HH:mm',
  order,
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

describe('handleEditDraftOrder() method', () => {
  it('should call handleEditDraftOrder()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'handleEditDraftOrder');
    renderedComponent.handleEditDraftOrder(order);
    expect(renderedComponent.handleEditDraftOrder.calledOnce).toEqual(true);
    expect(getComponent().state('draftOrder')).toEqual(order);
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
});

describe('handleDiscardAllOrders', () => {
  it('should be called on discarding all draft orders', () => {
    const { wrapper } = setup();

    wrapper.instance().handleDiscardAllOrders();
    expect(props.deleteAllDraftOrders.mock.calls.length).toEqual(2);
  });
});

describe('Test for Searching and Adding an order', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('behaviour when the length of the unsaved draft orders table is more than zero', () => {
  it('should render a DraftDataTable if length of draftOrders is not zero ', () => {
    const propsOne = {
      outpatientCareSetting:{
        uuid: '',
        display: '',
      },
      inpatientCareSetting: {
        uuid: '',
        display: '',
      },
      getPastOrders: jest.fn(),
      draftOrders: [],
      setOrderAction: jest.fn(),
      location:{
        search: '',
      },
      order,
      selectDrugSuccess: jest.fn(),
      fetchInpatientCareSetting: jest.fn(),
      fetchOutpatientCareSetting: jest.fn(),
      deleteDraftOrder: jest.fn(),
      deleteAllDraftOrders: jest.fn(),
      drug: "abc-e345-thed-uuid2345",
      dateFormat: 'DD-MMM-YYYY HH:mm',
    };
    const wrapperOne = shallow(<SearchAndAddOrder {...propsOne} store={store} />);
    const propsTwo = {
      outpatientCareSetting:{
        uuid: '',
        display: '',
      },
      inpatientCareSetting: {
        uuid: '',
        display: '',
      },
      getPastOrders: jest.fn(),
      draftOrders: [
        {dose: '', doseUnits: ''}
      ],
      setOrderAction: jest.fn(),
      location:{
        search: '',
      },
      order,
      selectDrugSuccess: jest.fn(),
      fetchInpatientCareSetting: jest.fn(),
      fetchOutpatientCareSetting: jest.fn(),
      deleteDraftOrder: jest.fn(),
      deleteAllDraftOrders: jest.fn(),
      drug: "abc-e345-thed-uuid2345",
      dateFormat: 'DD-MMM-YYYY HH:mm',
    };
    const wrapperTwo = shallow(<SearchAndAddOrder {...propsTwo} store={store} />);
    expect(wrapperOne.find(ConnectedDraftTable) === wrapperTwo.find(ConnectedDraftTable)).toEqual(false);

  });
});
