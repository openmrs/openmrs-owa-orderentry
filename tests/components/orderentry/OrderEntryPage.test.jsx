import React from 'react';
import { shallowWithIntl } from '@openmrs/react-components';
import ConnectedOrderEntryPage, { OrderEntryPage } from '../../../app/js/components/orderEntry/OrderEntryPage';
import * as orderTypes from '../../../app/js/components/orderEntry/orderTypes';
import DrugOrderEntry from '../../../app/js/components/drugOrderEntry';

let props;

let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallowWithIntl(<SearchDrug {...props} />);
  }
  return mountedComponent;
};

describe('Test for Order entry page when orderentryowa.encounterType is set', () => {
  beforeEach(() => {
    props = {
      dispatch: jest.fn(),
      editDraftDrugOrder: jest.fn(),
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getLabOrderables: jest.fn(),
      getDateFormat: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      setSelectedOrder: jest.fn(),
      setContext: jest.fn(),
      encounterType: { uuid: '1eeee' },
      sessionReducer: {
        currentProvider: {
          uuid: '1eeeee'
        },
      sessionLocation: {
          uuid: 'hospital'
      }},
      globalProperties: {
        'orderentryowa.labOrderAutoExpireTimeInDays': '30',
      },
      createOrder: jest.fn(),
      configurations: {
        drugDispensingUnits: [{
          display: 'display',
          uuid: '123mockUUIDef',
        }],
        drugDosingUnits: [{
          display: 'display',
          uuid: '123mockUUIDef',
        }],
        drugRoutes: [{
          display: 'display',
          uuid: '123mockUUIDef',
        }],
        durationUnits: [{
          display: 'display',
          uuid: '123mockUUIDef',
        }],
        orderFrequencies: [{
          display: 'display',
          uuid: '123mockUUIDef',
        }],
      },
      settingEncounterTypeReducer: {
        settingEncounterType: 'order type',
        error: '',
      },
      settingEncounterRoleReducer: {
        settingEncounterRole: 'Admin role',
        roleError: '',
      },
      toggleDraftLabOrderUrgency: jest.fn(),
      dateFormatReducer: {
        dateFormat: 'DD-MMM-YYYY HH:mm',
        error: '',
      },
      orderSelectionReducer: { currentOrderType: {} },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: { search: '?patient=esere_shbfidfb_343ffd' },
      currentOrderType: {
        id: '94386782390',
      },
      draftLabOrders: {
        orders: [
          { display: 'Hemoglobin', uuid: '12746hfgjff' },
          { display: 'Hematocrit', uuid: '12746hfgjff' },
          { display: 'blood', uuid: '12746hfgjff' },
        ],
      },
      draftDrugOrders: [{ drugName: 'paracetamol' }],
      createOrderReducer: {
        status: {
          error: false,
          added: true,
        },
        labOrderData: {},
      },
      fetchLabOrders: jest.fn(),
      labOrderableReducer: {
        orderables: [{
          uuid: '1234'
        }]
      },
      patient: {
        patient: {
          person: {
            personName: {
              givenName: '',
              familyName: '',
            },
            preferredAddress: {},
          },
          patientIdentifier: {
            identifier: '',
          },
        },
      },
    };
    mountedComponent = undefined;
  });

  it('should render component', () => {
    mountedComponent = shallowWithIntl(<OrderEntryPage {...props} />);
    expect(mountedComponent).toMatchSnapshot();
  });

  it('should render Loader Images ', () => {
    props.outpatientCareSetting = null;
    mountedComponent = shallowWithIntl(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div img').length).toBe(1);
  });

  it('should not show error', () => {
    mountedComponent = shallowWithIntl(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div.error-notice').length).toBe(0);
  });

  it('renders the patient-orders component', () => {
    const component = shallowWithIntl(<OrderEntryPage {...props} />);
    component.find('.orders-nav').simulate('click');
    expect(props.setSelectedOrder).toBeCalled();
    expect(component.find('.orders-nav').exists()).toBeTruthy();
  });

  it('should switch the order type in the state', () => {
    const component = shallowWithIntl(<OrderEntryPage {...props} />);
    const componentInstance = component.instance();
    const orderTypesAsArray = Object.values(orderTypes);
    const mockCurrentOrderType = { id: '94386782390' };
    expect(props.currentOrderType).toEqual(mockCurrentOrderType);
    componentInstance.switchOrderType(orderTypesAsArray[1]);
    expect(props.setSelectedOrder).toBeCalled();
  });

  it(`does not switch order type page if the current
  orderType is same as the new orderType`, () => {
    const component = shallowWithIntl(<OrderEntryPage {...props} />);
    const componentInstance = component.instance();
    const orderTypesAsArray = Object.values(orderTypes);
    componentInstance.switchOrderType(orderTypesAsArray[0]);
    expect(props.setSelectedOrder).toBeCalled();
  });
});

describe('when orderentryowa.encounterType is not set', () => {
  it('should not render DrugOrderEntry Component ', () => {
    mountedComponent = shallowWithIntl(<OrderEntryPage {...props} />);
    mountedComponent.setProps({
      ...mountedComponent.props(),
      settingEncounterTypeReducer: {
        settingEncounterType: '',
        error: 'Property can not be found',
      },
    });
    expect(mountedComponent.find(DrugOrderEntry).length).toBe(0);
  });

  it('should show error', () => {
    mountedComponent = shallowWithIntl(<OrderEntryPage {...props} />);
    mountedComponent.setProps({
      ...mountedComponent.props(),
      settingEncounterTypeReducer: {
        settingEncounterType: '',
        error: 'Property can not be found',
      },
    });
    expect(mountedComponent.find('div.error-notice').length).toBe(1);
  });
});

describe('when orderentryowa.encounterRole is set', () => {
  it('should not show error', () => {
    mountedComponent = shallowWithIntl(<OrderEntryPage {...props} />);
    mountedComponent.setProps({
      ...mountedComponent.props(),
      settingEncounterTypeReducer: {
        settingEncounterType: 'order type',
        error: '',
      },
    });
    expect(mountedComponent.find('div.error-notice').length).toBe(0);
  });
});

describe('when orderentryowa.encounterRole is not set', () => {
  it('should not render DrugOrderEntry Component ', () => {
    mountedComponent = shallowWithIntl(<OrderEntryPage {...props} />);
    mountedComponent.setProps({
      ...mountedComponent.props(),
      settingEncounterRoleReducer: {
        settingEncounterRole: '',
        roleError: 'error error',
      },
    });
    expect(mountedComponent.find(DrugOrderEntry).length).toBe(0);
  });

  it('should show error', () => {
    mountedComponent = shallowWithIntl(<OrderEntryPage {...props} />);
    mountedComponent.setProps({
      ...mountedComponent.props(),
      settingEncounterRoleReducer: {
        settingEncounterRole: '',
        roleError: 'error error',
      },
    });
    expect(mountedComponent.find('div.error-notice').length).toBe(1);
  });
});

describe('when orderentryowa.dateAndTimeFormat is set', () => {
  it('should not show error', () => {
    mountedComponent = shallowWithIntl(<OrderEntryPage {...props} />);
    mountedComponent.setProps({
      ...mountedComponent.props(),
      dateFormatReducer: {
        dateFormat: 'DD-MMM-YYYY HH:mm',
        error: '',
      },
    });
    expect(mountedComponent.find('div.error-notice').length).toBe(0);
  });
});

describe('when orderentryowa.dateAndTimeFormat is set', () => {
  it('should show error', () => {
    mountedComponent = shallowWithIntl(<OrderEntryPage {...props} />);
    mountedComponent.setProps({
      ...mountedComponent.props(),
      dateFormatReducer: {
        dateFormat: null,
        error: '',
      },
    });
    expect(mountedComponent.find('div.error-notice').length).toBe(1);
  });
});

describe('Handling Submit', () => {
  it('It dispatches create lab order action if the handleSubmit method is triggered', () => {
    const wrapper = shallowWithIntl(<OrderEntryPage {...props} />);
    const handleSubmit = wrapper.instance().handleSubmit;
    handleSubmit();
    const { draftDrugOrders, draftLabOrders } = mockData;
    wrapper.setProps({
      ...wrapper.props(),
      draftDrugOrders,
      draftLabOrders,
    });
    handleSubmit();
    expect(props.createOrder).toHaveBeenCalled();
  });

  it('shows a toast prompt when test is submitted successfully', () => {
    const component = getComponent();
    component.setProps({
      ...component.props(),
      createOrderReducer: {
        status: {
          error: false,
          added: true,
        },
        labOrderData: { uuid: 'kjdhggf', display: 'order Entry', orders: [{ display: 'true' }] },
      },
    });
    expect(global.toastrMessage).toEqual('Order Successfully Created');
  });
});

it('shows a toast prompt when there is an error in submission', () => {
  const component = getComponent();
  component.setProps({
    ...component.props(),
    createOrderReducer: {
      status: {
        error: true,
        added: false,
      },
      labOrderData: {},
      errorMessage: 'an error occured',
    },
  });
  expect(global.toastrMessage).toEqual('an error occured');
});

describe('Connected OrderEntryPage component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      careSettingReducer: {
        outpatientCareSetting: { uuid: '' },
        inpatientCareSetting: { uuid: '' },
      },
      settingEncounterTypeReducer: {
        settingEncounterType: 'order entry',
        error: '',
      },
      toggleDraftLabOrderUrgency: jest.fn(),
      orderSelectionReducer: { currentOrderType: {} },
      patientReducer: {
        patient: {
          patientId: 'some-random-id',
          patientIdentiier: { uuid: 'some-random-uuid' },
          person: { gender: 'M', age: 12, birthdate: '2006-08-08T00:00:00.000+0100' },
          personName: { display: 'joey bart' },
        },
      },
      encounterRoleReducer: {
        encounterRole: {},
      },
      openmrs: {
        session: {},
        metadata: {
          globalProperties: {
            'orderentryowa.labOrderAutoExpireTimeInDays': '30',
          },
        },
      },
      encounterReducer: { encounterType: {} },
      orderEntryConfigurations: {
        configurations: {
          drugDispensingUnits: {
            display: 'display',
            uuid: '123mockUUIDef',
          },
          drugDosingUnits: {
            display: 'display',
            uuid: '123mockUUIDef',
          },
          drugRoutes: {
            display: 'display',
            uuid: '123mockUUIDef',
          },
          durationUnits: {
            display: 'display',
            uuid: '123mockUUIDef',
          },
          orderFrequencies: {
            display: 'display',
            uuid: '123mockUUIDef',
          },
        },
      },
      noteReducer: { note: [] },
      draftReducer: {
        draftLabOrders: {
          orders: [],
        },
        draftDrugOrders: [{ drugName: 'paracetamol' }],
      },
      createOrderReducer: {
        status: {
          error: false,
          added: true,
        },
        labOrderData: {},
      },
      fetchLabOrders: jest.fn(),
      labOrderableReducer: {
        orderables: [{
          uuid: '1234'
        }]
      },
      contextReducer: {

      }
    });
    const wrapper = shallowWithIntl(<ConnectedOrderEntryPage store={store} {...props} />);
    expect(wrapper.length).toBe(1);
  });
});
