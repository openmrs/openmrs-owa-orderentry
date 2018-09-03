import React from 'react';
import ConnectedOrderEntryPage, { OrderEntryPage } from '../../../app/js/components/orderEntry/OrderEntryPage';
import * as orderTypes from '../../../app/js/components/orderEntry/orderTypes';
import DrugOrderEntry from '../../../app/js/components/drugOrderEntry';

let props;

let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<SearchDrug {...props} />);
  }
  return mountedComponent;
};

describe('Test for Order entry page when orderentryowa.encounterType is set', () => {
  beforeEach(() => {
    props = {
      editDraftDrugOrder: jest.fn(),
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getLabOrderables: jest.fn(),
      getDateFormat: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      setSelectedOrder: jest.fn(),
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
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      currentOrderType: {
        id: '94386782390'
      },
      draftLabOrders: {
        orders: [
          { display: 'Hemoglobin', uuid: '12746hfgjff' },
          { display: 'Hematocrit', uuid: '12746hfgjff' },
          { display: 'blood', uuid: '12746hfgjff' },
        ]
      },
      draftDrugOrders: [{ drugName: 'paracetamol' }],
    };
    mountedComponent = undefined;
  });

  it('should render component', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent).toMatchSnapshot();
  });

  it('should render Loader Images ', () => {
    props.outpatientCareSetting = null;
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div img').length).toBe(1);
  });
  it('should not show error', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div.error-notice').length).toBe(0);
  });
  it('renders the patient-orders component', () => {
    const component =  shallow(<OrderEntryPage {...props} />);
    component.find('.orders-nav').simulate('click');
    expect(props.setSelectedOrder).toBeCalled();
    expect(component.find('.orders-nav').exists()).toBeTruthy();
  })
  it('should switch the order type in the state', () => {
    const component =  shallow(<OrderEntryPage {...props} />);
    const componentInstance = component.instance();
    const orderTypesAsArray = Object.values(orderTypes);
    const mockCurrentOrderType = { id: '94386782390' };
    expect(props.currentOrderType).toEqual(mockCurrentOrderType);
    componentInstance.switchOrderType(orderTypesAsArray[1]);
    expect(props.setSelectedOrder).toBeCalled();
  });
  it(`does not switch order type page if the current
  orderType is same as the new orderType`, () => {
    const component =  shallow(<OrderEntryPage {...props} />);
    const componentInstance = component.instance();
    const orderTypesAsArray = Object.values(orderTypes);
    componentInstance.switchOrderType(orderTypesAsArray[0]);
    expect(props.setSelectedOrder).toBeCalled();
  })
});

describe('Test for Order entry page when orderentryowa.encounterType is not set', () => {
  beforeEach(() => {
    props = {
      editDraftDrugOrder: jest.fn(),
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
      getLabOrderables: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      setSelectedOrder: jest.fn(),
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
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      draftLabOrders: {
        orders: [{ display: 'Hemoglobin', uuid: '12746hfgjff' }],
      },
      draftDrugOrders: [{ drugName: 'paracetamol' }],
    };
    mountedComponent = undefined;
  });
  it('should not render DrugOrderEntry Component ', () => {
    props.settingEncounterTypeReducer = {
      settingEncounterType: '',
      error: 'Property can not be found',
    }
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find(DrugOrderEntry).length).toBe(0);
  });
  it('should show error', () => {
    props.settingEncounterTypeReducer = {
      settingEncounterType: '',
      error: 'Property can not be found',
    }
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div.error-notice').length).toBe(1);
  });
});

describe('Test for Order entry page when orderentryowa.encounterRole is set', () => {
  beforeEach(() => {
    props = {
      editDraftDrugOrder: jest.fn(),
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
      getLabOrderables: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      setSelectedOrder: jest.fn(),
      settingEncounterTypeReducer: {
        settingEncounterType: 'order type',
        error: '',
      },
      settingEncounterRoleReducer: {
        settingEncounterRole: 'Admin role',
        roleError: '',
      },
      toggleDraftLabOrderUrgency: jest.fn(),
      orderSelectionReducer: { currentOrderType: {} },
      dateFormatReducer: {
        dateFormat: 'DD-MMM-YYYY HH:mm',
        error: '',
      },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      draftLabOrders: {
        orders: [{ display: 'Hemoglobin', uuid: '12746hfgjff' }],
      },
      draftDrugOrders: [{ drugName: 'paracetamol' }],
    };
    mountedComponent = undefined;
  });

  it('should not show error', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div.error-notice').length).toBe(0);
  });
});

describe('Test for Order entry page when orderentryowa.encounterRole is not set', () => {
  beforeEach(() => {
    props = {
      editDraftDrugOrder: jest.fn(),
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
      getLabOrderables: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      setSelectedOrder: jest.fn(),
      settingEncounterTypeReducer: {
        settingEncounterType: 'order type',
        error: '',
      },
      settingEncounterRoleReducer: {
        settingEncounterRole: '',
        roleError: 'error error',
      },
      toggleDraftLabOrderUrgency: jest.fn(),
      dateFormatReducer: {
        dateFormat: 'DD-MMM-YYYY HH:mm',
        error: '',
      },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      draftLabOrders: {
        orders: [{ display: 'Hemoglobin', uuid: '12746hfgjff' }],
      },
      draftDrugOrders: [{ drugName: 'paracetamol' }],
    };
    mountedComponent = undefined;
  });

  it('should not render DrugOrderEntry Component ', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find(DrugOrderEntry).length).toBe(0);
  });
  it('should show error', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div.error-notice').length).toBe(1);
  });
});

describe('Test for Order entry page when orderentryowa.dateAndTimeFormat is set', () => {
  beforeEach(() => {
    props = {
      editDraftDrugOrder: jest.fn(),
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
      getLabOrderables: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      setSelectedOrder: jest.fn(),
      settingEncounterTypeReducer: {
        settingEncounterType: 'order type',
        error: '',
      },
      settingEncounterRoleReducer: {
        settingEncounterRole: 'Admin role',
        roleError: '',
      },
      toggleDraftLabOrderUrgency: jest.fn(),
      orderSelectionReducer: { currentOrderType: {} },
      dateFormatReducer: {
        dateFormat: 'DD-MMM-YYYY HH:mm',
        error: '',
      },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      draftLabOrders: {
        orders: [{ display: 'Hemoglobin', uuid: '12746hfgjff' }],
      },
      draftDrugOrders: [{ drugName: 'paracetamol' }],
    };
    mountedComponent = undefined;
  });
  it('should not show error', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div.error-notice').length).toBe(0);
  });
});

describe('Test for Order entry page when orderentryowa.encounterRole is not set', () => {
  beforeEach(() => {
    props = {
      editDraftDrugOrder: jest.fn(),
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
      getLabOrderables: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      setSelectedOrder: jest.fn(),
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
        dateFormat: '',
        error: 'incomplete config',
      },
      orderSelectionReducer: { currentOrderType: {} },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      draftLabOrders: {
        orders: [{ display: 'Hemoglobin', uuid: '12746hfgjff' }],
      },
      draftDrugOrders: [{ drugName: 'paracetamol' }],
    };
    mountedComponent = undefined;
  });

  it('should not render DrugOrderEntry Component ', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find(DrugOrderEntry).length).toBe(0);
  });
  it('should show error', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div.error-notice').length).toBe(1);
  });
});

describe('Connected OrderEntryPage component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      careSettingReducer: {
        outpatientCareSetting: { uuid: '' },
        inpatientCareSetting: { uuid: '' }
      },
      settingEncounterTypeReducer: {
        settingEncounterType: 'order entry',
        error: ''
      },
      toggleDraftLabOrderUrgency: jest.fn(),
      orderSelectionReducer: { currentOrderType: {} },
      patientReducer: {
        patient: {
          patientId: 'some-random-id',
          patientIdentiier: { uuid: 'some-random-uuid'},
          person:{ gender:'M', age: 12, birthdate: '2006-08-08T00:00:00.000+0100'},
          personName: { display: 'joey bart'}
        }
      },
      noteReducer: { note: []},
      draftReducer: {
        draftLabOrders: {
          orders: [],
        },
        draftDrugOrders: [{ drugName: 'paracetamol' }],
      },
    });
    const props = {
      location: {search: '?patient=esere_shbfidfb_343ffd'}
    }
    const wrapper = shallow(<ConnectedOrderEntryPage store={store} {...props}/>);
    expect(wrapper.length).toBe(1);
  });
});
