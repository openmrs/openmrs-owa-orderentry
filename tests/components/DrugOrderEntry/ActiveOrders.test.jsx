import React from 'react';

import { ActiveOrders } from '../../../app/js/components/drugOrderEntry/ActiveOrders';
import { AddForm } from '../../../app/js/components/drugOrderEntry/addForm/AddForm';

const { data, careSetting, order } = mockData;

const props = {
  handleEditActiveDrugOrder: jest.fn(),
  activeOrderAction: jest.fn(),
  addDraftOrder: jest.fn(),
  onDelete: jest.fn(),
  setOrderAction: jest.fn(),
  isDelete: false,
  drugOrder: {
    activeOrders: [
      {
      drug: { display: 'Morphine'},
      uuid:'024b1459-f31d-46cb-8ad3-2a624c894e2c',
      dose:1,
      quantity:2,
      duration:2,
      auditInfo:{dateCreated:'2018-03-20 10:59:22'},
      drug:{display:'new drug'},
      doseUnits:{display:'drops'},
      frequency:{display:'twice a week'},
      route:{display:'reactally'},
      quantityUnits:{display:'drops'},
      durationUnits:{display:'weeks'},
      dosingType: "org.openmrs.SimpleDosingInstructions",
      dosingInstructions: '3 tabs'
      }
    ],
    loading: false
  },
  dateFormat: 'DD-MMM-YYYY HH:mm',
  location: {
    search: {}
  },
  careSetting,
  data,
  order,
}

let mountedComponent;
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<ActiveOrders {...props} store={store} />);
  }
  return mountedComponent;
};

describe('Test for Inpatient Active orders', () => {
  it('should render component', () => {
    expect(getComponent()).toMatchSnapshot()
  });
});

describe('onClickDiscontinue() method', () => {
  it('should call onClickDiscontinue()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'onClickDiscontinue');
    renderedComponent.onClickDiscontinue(order);
    expect(renderedComponent.onClickDiscontinue.calledOnce).toEqual(true);
    expect(getComponent().state('draftOrder')).toEqual({
      action: "DISCONTINUE",
      careSetting: "",
      dispensingQuantity: undefined,
      dispensingUnit: undefined,
      dose: "",
      dosingUnit: "",
      dosingType: "org.openmrs.SimpleDosingInstructions",
      dosingUnit: undefined,
      drug: "",
      drugInstructions: undefined,
      duration: "",
      durationUnit: undefined,
      frequency: "",
      reason: undefined,
      route: "",
      orderNumber: "",
      orderer: "",
      type: undefined,
      uuid: "",
      drugName: "",
    });
  });
});

describe('fetchActiveOrders() method', () => {
  it('should call fetchActiveOrders()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'fetchActiveOrders');
    renderedComponent.fetchActiveOrders(props);
    expect(renderedComponent.fetchActiveOrders.calledOnce).toEqual(true);
  });
});

describe('onPageChange() method', () => {
  it('should call onPageChange()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'onPageChange');
    renderedComponent.onPageChange(data);
    expect(renderedComponent.onPageChange.calledOnce).toEqual(true);
  });
});

describe('behaviour when dosing type is free text', () => {
  it('should still display a table', () => {
    const props = {
      handleEditActiveDrugOrder: jest.fn(),
      activeOrderAction: jest.fn(),
      addDraftOrder: jest.fn(),
      onDelete: jest.fn(),
      setOrderAction: jest.fn(),
      isDelete: false,
      drugOrder: {
        activeOrders: [
          {
            drug: { display: 'Morphine'},
            uuid:'024b1459-f31d-46cb-8ad3-2a624c894e2c',
            dose:1,
            quantity:2,
            duration:2,
            auditInfo:{dateCreated:'2018-03-20 10:59:22'},
            drug:{display:'new drug'},
            doseUnits:{display:'drops'},
            frequency:{display:'twice a week'},
            route:{display:'reactally'},
            quantityUnits:{display:'drops'},
            durationUnits:{display:'weeks'},
            dosingType: "org.openmrs.FreeTextInstructions",
            }
        ],
        loading: false
      },
      location: {
        search: {}
      },
      careSetting,
      data,
      order: {}
    }
    const wrapper = shallow(<ActiveOrders {...props} />);
    expect(wrapper.find('table').length).toEqual(1);
  });
});

describe('behaviour when status is edit', () => {
  it('should display  <p> will REVISE </p>', () => {
    const props = {
      handleEditActiveDrugOrder: jest.fn(),
      activeOrderAction: jest.fn(),
      addDraftOrder: jest.fn(),
      onDelete: jest.fn(),
      setOrderAction: jest.fn(),
      isDelete: false,
      drugOrder: {
        activeOrders: [
          {
            drug: { display: 'Morphine'},
            uuid:'024b1459-f31d-46cb-8ad3-2a624c894e2c',
            dose:1,
            quantity:2,
            duration:2,
            auditInfo:{dateCreated:'2018-03-20 10:59:22'},
            drug:{display:'new drug'},
            doseUnits:{display:'drops'},
            frequency:{display:'twice a week'},
            route:{display:'reactally'},
            quantityUnits:{display:'drops'},
            durationUnits:{display:'weeks'},
            dosingType: "org.openmrs.FreeTextInstructions",
            status:'EDIT'
            }
        ],
        loading: false
      },
      location: {
        search: {}
      },
      careSetting,
      data,
      order: {
        status: 'EDIT'
      },
    }
    const mockCallBack = jest.fn();
    const wrapper = shallow(<ActiveOrders onClick={mockCallBack} {...props} />);
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'showOrders');
    renderedComponent.showOrders(props.drugOrder.activeOrders);
    expect(renderedComponent.showOrders.calledOnce).toEqual(true);
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('should call edit', () => {
    const props = {
      handleEditActiveDrugOrder: jest.fn(),
      activeOrderAction: jest.fn(),
      addDraftOrder: jest.fn(),
      onDelete: jest.fn(),
      setOrderAction: jest.fn(),
      isDelete: false,
      drugOrder: {
        activeOrders: [
          {
            drug: { display: 'Morphine'},
            uuid:'024b1459-f31d-46cb-8ad3-2a624c894e2c',
            dose:1,
            quantity:2,
            duration:2,
            auditInfo:{dateCreated:'2018-03-20 10:59:22'},
            drug:{display:'new drug'},
            doseUnits:{display:'drops'},
            frequency:{display:'twice a week'},
            route:{display:'reactally'},
            quantityUnits:{display:'drops'},
            durationUnits:{display:'weeks'},
            dosingType: "org.openmrs.FreeTextInstructions",
            }
        ],
        loading: false
      },
      location: {
        search: {}
      },
      careSetting,
      data,
    }
    const mockCallBack = jest.fn();
    const wrapper = shallow(<ActiveOrders onClick={mockCallBack} {...props} />);
    wrapper.find('a').find('#edit-drug-orders').simulate('click');
  });
});

describe('behaviour when status is DISCONTINUE', () => {
  it('should display  <p> will DISCONTINUE </p>', () => {
    const props = {
      handleEditActiveDrugOrder: jest.fn(),
      activeOrderAction: jest.fn(),
      addDraftOrder: jest.fn(),
      onDelete: jest.fn(),
      setOrderAction: jest.fn(),
      isDelete: true,
      drugOrder: {
        activeOrders: [
          {
            drug: { display: 'Morphine'},
            uuid:'024b1459-f31d-46cb-8ad3-2a624c894e2c',
            dose:1,
            quantity:2,
            duration:2,
            auditInfo:{dateCreated:'2018-03-20 10:59:22'},
            drug:{display:'new drug'},
            doseUnits:{display:'drops'},
            frequency:{display:'twice a week'},
            route:{display:'reactally'},
            quantityUnits:{display:'drops'},
            durationUnits:{display:'weeks'},
            dosingType: "org.openmrs.FreeTextInstructions",
            careSetting: {uuid: ''},
            orderer: {uuid: ''},
            status:"DISCONTINUE"
            }
        ],
        loading: false
      },
      location: {
        search: {}
      },
      careSetting,
      data,
      order: {
        status: 'DISCONTINUE'
      },
    }
    const mockCallBack = jest.fn();
    const wrapper = shallow(<ActiveOrders onClick={mockCallBack} {...props} />);
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('should call delete', () => {
    const props = {
      handleEditActiveDrugOrder: jest.fn(),
      activeOrderAction: jest.fn(),
      addDraftOrder: jest.fn(),
      onDelete: jest.fn(),
      setOrderAction: jest.fn(),
      isDelete: true,
      drugOrder: {
        activeOrders: [
          {
            drug: { display: 'Morphine'},
            uuid:'024b1459-f31d-46cb-8ad3-2a624c894e2c',
            dose:1,
            quantity:2,
            duration:2,
            auditInfo:{dateCreated:'2018-03-20 10:59:22'},
            drug:{display:'new drug'},
            doseUnits:{display:'drops'},
            frequency:{display:'twice a week'},
            route:{display:'reactally'},
            quantityUnits:{display:'drops'},
            durationUnits:{display:'weeks'},
            dosingType: "org.openmrs.FreeTextInstructions",
            careSetting: {uuid: ''},
            orderer: {uuid: ''},
            }
        ],
        loading: false
      },
      location: {
        search: {}
      },
      careSetting,
      data
    }
    const mockCallBack = jest.fn();
    const wrapper = shallow(<ActiveOrders onClick={mockCallBack} {...props} />);
    wrapper.find('a').find('#delete').simulate('click');
  })
});


describe('behaviour when there is no active orders', () => {
  it('should display <p>No Active Orders</p>', () => {
    const props = {
      handleEditActiveDrugOrder: jest.fn(),
      activeOrderAction: jest.fn(),
      addDraftOrder: jest.fn(),
      onDelete: jest.fn(),
      setOrderAction: jest.fn(),
      isDelete: false,
      drugOrder: {
        activeOrders: [],
        loading: false
      },
      location: {
        search: {}
      },
      careSetting,
      data,
      order,
    }
    const wrapper = shallow(<ActiveOrders {...props} />);
    expect(wrapper.find('p').text()).toEqual('No Active Orders');
  });
});

describe('behaviour when there is no active orders and page is loading', () => {
  it('should display <img src={imageLoader} alt="loader" />', () => {
    const props = {
      handleEditActiveDrugOrder: jest.fn(),
      activeOrderAction: jest.fn(),
      addDraftOrder: jest.fn(),
      onDelete: jest.fn(),
      setOrderAction: jest.fn(),
      isDelete: false,
      drugOrder: {
        activeOrders: [],
        loading: true
      },
      location: {
        search: {}
      },
      careSetting,
      data,
      order,
      tabName: '',
    }
    const wrapper = shallow(<ActiveOrders {...props} />);
    expect(wrapper.find('img').length).toEqual(1);
  });
});

describe('componentWillReceiveProps()', () => {
  it('call fetchActiveOrders and udpate state', () => {
      const renderedComponent = getComponent().instance();
      getComponent().setProps({ tabName: 'outpatient' })
      expect(renderedComponent.fetchActiveOrders.calledOnce).toEqual(false);
      getComponent().setProps({ pageCount: 9 })
      expect(getComponent().state().pageCount).toEqual(9);
  });
});
