import React from 'react';
import configureStore from 'redux-mock-store';
import { mountWithIntl, shallowWithIntl } from '@openmrs/react-components';
import ConnectedOrdersTablePage, { OrdersTable } from '../../../app/js/components/orderEntry/OrdersTable';
import { rejects } from 'assert';


jest.mock('sweetalert', () => jest.fn((question, answer) => "YES"));

const mockStore = configureStore();

const {
  encounterRole,
  allConfigurations,
  sessionReducer,
  encounterType,
  orders,
  patient,
  careSetting,
  draftOrders,
  addedOrder,
  addedOrderError,
  items,
  itemName,
  freeTextOrder,
  standardDoseOrder,
} = mockData;

const mockDrugOrder = {
  date: "24/12/2018",
  display: "Paracetamol",
  type: "drugorder",
  dosingInstructions: "15mg of Amoxycillin syrup for the next 5 days",
  dosingUnit: "Pint",
  dispense: "25",
  activeDates: "25/08/2018 - 25/08/2019",
  orderer: {display: "Mark Goodrich"},
  status: "Active",
  uuid: 2,
  route:'random',
  durationUnit: '5',
  orderNumber: 22,
};

const mockLabOrder = {
  date: "24/12/2018",
  display: "Complete Blood Count",
  type: "testorder",
  activeDates: "25/08/2018 - 25/08/2019",
  orderer: {display: "Mark Goodrich"},
  status: "Active",
  uuid: 2,
  orderNumber: 22,
};

const props = {
  allConfigurations,
  filteredOrders: [
    {
      activeDates: '24/12/2018',
      display: 'Paracetamol',
      orderType: {
        name: 'drugorder'
      },
      dosingInstructions: '25mg of Amoxycillin syrup for the next 5 days',
      dispense: '45',
      orderer: { display: 'Mark Goodrich' },
      drug: {
        uuid: "502a2b2e-4659-4987-abbd-c50545dead47",
        display: "Paracetamol",
      },
      urgency: 'STAT',
      uuid: 2,
    },
    {
      activeDates: '24/12/2018',
      display: 'Paracetamol',
      orderType: {
        name: 'testorder'
      },
      orderer: { display: 'Mark Goodrich' },
      drug: {
        uuid: "502a2b2e-4659-4987-abbd-c50545dead47",
        display: "Paracetamol",
      },
      urgency: 'STAT',
      uuid: 2,
    },
  ],
  dateFormatReducer: { dateFormat: '', },
  status: {
    fetched: true,
  },
  patient: {
    patientId: 'some-random-id',
    uuid: 'some-random-id',
    patientIdentiier: { uuid: 'some-random-uuid' },
    person: { gender: 'M', age: 12, birthdate: '2006-08-08T00:00:00.000+0100' },
    personName: { display: 'joey bart' },
  },

  encounterType,
  encounterRole,
  careSettingReducer: { outpatientCareSetting: careSetting },
  sessionReducer: {
    ...sessionReducer,
    sessionLocation: 'drugs',
    locale: 'en',
  },
  dispatch: jest.fn(() => Promise.resolve()),
};

let mountedComponent;
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallowWithIntl(<OrdersTable {...props} store={store} />);
  }
  return mountedComponent;
};

describe('Orders component test-suite', () => {
  it('renders properly', () => {
    const wrapper = mountWithIntl(<OrdersTable {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('Accordion').exists()).toBeTruthy();
    wrapper.setProps({
      ...wrapper.props(),
      patient: {
        uuid: 'some-random-id2',
      },
    });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('Accordion').exists()).toBeTruthy();
  });

  it('does not render any data if the result array is empty', () => {
    const store = mockStore({
      patientReducer: {
        patient: {
          patientId: 'some-random-id',
          uuid: 'some-random-id',
          patientIdentiier: { uuid: 'some-random-uuid' },
          person: { gender: 'M', age: 12, birthdate: '2006-08-08T00:00:00.000+0100' },
          personName: { display: 'joey bart' },
        },
      },
      openmrs: {
        session: {
          currentProvider: {
            uuid: '',
          },
        },
      },
      encounterReducer: {
        encounterType,
      },
      encounterRoleReducer: { encounterRole },
      careSettingReducer: { outpatientCareSetting: careSetting },
      fetchOrdersReducer: {
        filteredOrders: [],
        status: {
          fetched: true,
        },
      },
      contextReducer: {},
      dateFormatReducer: { dateFormat: '', }
    });
    const props = {
      location: { search: '?patient=esere_shbfidfb_343ffd' },
    };
    const wrapper = mountWithIntl(<ConnectedOrdersTablePage store={store} {...props} />);
    expect(wrapper.find('.no-result-info').props().children).toEqual('No Orders');
  });

  it('handles editing of active orders', () => {

    const props = {
      filteredOrders: [
        {
            activeDates: "24/12/2018",
            display: "Paracetamol",
            orderType: {
              name: 'drugorder'
            },
            dosingInstructions: "25mg of Amoxycillin syrup for the next 5 days",
            dispense: "45",
            orderer: {display: "Mark Goodrich"},
            urgency: "STAT",
            uuid: 2
        },
        {
            activeDates: "24/12/2018",
            display: "Paracetamol",
            orderType: {
              name: 'testorder'
            },
            orderer: {display: "Mark Goodrich"},
            urgency: "STAT",
            uuid: 2
        }
      ],
      status: {
        fetched: true,
      },
      patient: {
        uuid: 'some-random-id',
      },
      sessionReducer: {
        locale: 'en',
      },
      dispatch: jest.fn()
    };

    const component = shallowWithIntl(<OrdersTable {...props}/>);
    const componentInstance = component.instance();
    componentInstance.handleActiveOrderEdit(mockDrugOrder);
    expect(props.dispatch).toBeCalled();
  });
});

describe('getUUID() method', () => {
  it('should call getUUID()', () => {
    const renderedComponent = getComponent().instance();
    const result = renderedComponent.getUUID(items, itemName);
    expect(result).toEqual(items[0]);
  });
});

describe('setDiscontinuedOrder method for drug orders', () => {
  it('should call setDiscontinuedOrder for drug orders', async (done) => {
    const renderedComponent = getComponent().instance();
    renderedComponent.setDiscontinuedOrder(mockDrugOrder);
    expect(props.dispatch).toBeCalled();
    done();
  });
});

describe('setDiscontinuedOrder method for lab orders', () => {
  it('should call setDiscontinuedOrder for lab orders', async (done) => {
    const renderedComponent = getComponent().instance();
    renderedComponent.setDiscontinuedOrder(mockLabOrder);
    expect(props.dispatch).toBeCalled();
    done();
  });
});

describe('discontinueOrder method', () => {
  it('should call discontinueOrder', async (done) => {
    const renderedComponent = getComponent().instance();
    renderedComponent.discontinueOrder(mockDrugOrder, 22);
    expect(props.dispatch).toBeCalled();
    done();
  });
});
