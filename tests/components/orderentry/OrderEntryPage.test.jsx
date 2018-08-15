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
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getLabOrderables: jest.fn(),
      getDateFormat: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      settingEncounterTypeReducer: {
        settingEncounterType: 'order type',
        error: '',
      },
      settingEncounterRoleReducer: {
        settingEncounterRole: 'Admin role',
        roleError: '',
      },
      dateFormatReducer: {
        dateFormat: 'DD-MMM-YYYY HH:mm',
        error: '',
      },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      draftLabOrders: [
        { display: 'Hemoglobin', uuid: '12746hfgjff' },
        { display: 'Hematocrit', uuid: '12746hfgjff' },
        { display: 'blood', uuid: '12746hfgjff' },
      ],
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
  it('should switch the order type in the state', () => {
    const component =  shallow(<OrderEntryPage {...props} />);
    const componentInstance = component.instance();
    const orderTypesAsArray = Object.values(orderTypes);
    expect(component.state('currentOrderType')).toBe(orderTypesAsArray[0]);
    componentInstance.switchOrderType(orderTypesAsArray[1]);
    expect(component.state('currentOrderType')).toBe(orderTypesAsArray[1]);
  });
  it(`does not switch order type page if the current
  orderType is same as the new orderType`, () => {
    const component =  shallow(<OrderEntryPage {...props} />);
    const componentInstance = component.instance();
    const orderTypesAsArray = Object.values(orderTypes);
    expect(component.state('currentOrderType')).toBe(orderTypesAsArray[0]);
    componentInstance.switchOrderType(orderTypesAsArray[0]);
    expect(component.state('currentOrderType')).toBe(orderTypesAsArray[0]);
  })
});

describe('Test for Order entry page when orderentryowa.encounterType is not set', () => {
  beforeEach(() => {
    props = {
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
      getLabOrderables: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      settingEncounterTypeReducer: {
        settingEncounterType: 'order type',
        error: '',
      },
      settingEncounterRoleReducer: {
        settingEncounterRole: 'Admin role',
        roleError: '',
      },
      dateFormatReducer: {
        dateFormat: 'DD-MMM-YYYY HH:mm',
        error: '',
      },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      draftLabOrders: [
        { display: 'Hemoglobin', uuid: '12746hfgjff' },
      ],
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
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
      getLabOrderables: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      settingEncounterTypeReducer: {
        settingEncounterType: 'order type',
        error: '',
      },
      settingEncounterRoleReducer: {
        settingEncounterRole: 'Admin role',
        roleError: '',
      },
      dateFormatReducer: {
        dateFormat: 'DD-MMM-YYYY HH:mm',
        error: '',
      },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      draftLabOrders: [
        { display: 'Hemoglobin', uuid: '12746hfgjff' },
      ],
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
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
      getLabOrderables: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      settingEncounterTypeReducer: {
        settingEncounterType: 'order type',
        error: '',
      },
      settingEncounterRoleReducer: {
        settingEncounterRole: '',
        roleError: 'error error',
      },
      dateFormatReducer: {
        dateFormat: 'DD-MMM-YYYY HH:mm',
        error: '',
      },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      draftLabOrders: [
        { display: 'Hemoglobin', uuid: '12746hfgjff' },
      ],
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
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
      getLabOrderables: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      settingEncounterTypeReducer: {
        settingEncounterType: 'order type',
        error: '',
      },
      settingEncounterRoleReducer: {
        settingEncounterRole: 'Admin role',
        roleError: '',
      },
      dateFormatReducer: {
        dateFormat: 'DD-MMM-YYYY HH:mm',
        error: '',
      },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      draftLabOrders: [
        { display: 'Hemoglobin', uuid: '12746hfgjff' },
      ],
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
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
      getLabOrderables: jest.fn(),
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      settingEncounterTypeReducer: {
        settingEncounterType: 'order type',
        error: '',
      },
      settingEncounterRoleReducer: {
        settingEncounterRole: 'Admin role',
        roleError: '',
      },
      dateFormatReducer: {
        dateFormat: '',
        error: 'incomplete config',
      },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'},
      draftLabOrders: [
        { display: 'Hemoglobin', uuid: '12746hfgjff' },
      ],
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
      patientReducer: {
        patient: {
          patientId: 'some-random-id',
          patientIdentiier: { uuid: 'some-random-uuid'},
          person:{ gender:'M', age: 12, birthdate: '2006-08-08T00:00:00.000+0100'},
          personName: { display: 'joey bart'}
        }
      },
      noteReducer: { note: []},
      draftLabOrderReducer: {
        draftLabOrders: [],
      },
    });
    const props = {
      location: {search: '?patient=esere_shbfidfb_343ffd'}
    }
    const wrapper = shallow(<ConnectedOrderEntryPage store={store} {...props}/>);
    expect(wrapper.length).toBe(1);
  });

  describe('Displaying the draft orders list for all order pages', () => {
    beforeEach(() => {
      props = {
        fetchPatientCareSetting: jest.fn(),
        getSettingEncounterType: jest.fn(),
        getSettingEncounterRole: jest.fn(),
        getDateFormat: jest.fn(),
        getLabOrderables: jest.fn(),
        fetchPatientRecord: jest.fn(),
        fetchPatientNote: jest.fn(),
        settingEncounterTypeReducer: {
          settingEncounterType: 'order type',
          error: '',
        },
        settingEncounterRoleReducer: {
          settingEncounterRole: 'Admin role',
          roleError: '',
        },
        dateFormatReducer: {
          dateFormat: '',
          error: 'incomplete config',
        },
        outpatientCareSetting: { uuid: '5677666' },
        inpatientCareSetting: { uuid: '6766667' },
        location: {search: '?patient=esere_shbfidfb_343ffd'},
        draftLabOrders: [
          { display: 'Hemoglobin', uuid: '12746hfgjff' },
        ],
        dispatch: jest.fn(),
        removeTestPanelFromDraft: jest.fn(),
        removeTestFromDraft: jest.fn(),
        deleteDraftLabOrder: jest.fn(),
        toggleDraftLabOrdersUgency: jest.fn(),
      }
      mountedComponent = shallow(<OrderEntryPage {...props} />);
    });

    it('should dispatch an action to handle single test deletion', () => {
      const instance = mountedComponent.instance();
      instance.state.selectedPanelIds = [1];
      const mockTest = { uuid: 'ifffy9847464', display: 'Hemoglobin', concept: '12746hfgjff' };

      instance.discardTestsInDraft(mockTest, 'single');
      expect(props.removeTestFromDraft).toBeCalled();
    });

    it('should dispatch an action to handle panel deletion', () => {
      const instance = mountedComponent.instance();
      instance.state.selectedPanelIds = [1];
      const mockPanel = { uuid: 'ifffy9847464', display: 'Hemoglobin', concept: '12746hfgjff' };

      instance.discardTestsInDraft(mockPanel, 'panel');
      expect(props.removeTestPanelFromDraft).toBeCalled();
    });

    it('should dispatch an action to handle deletion of all items from the draft', () => {
      const instance = mountedComponent.instance();
      instance.state.selectedPanelIds = [1];

      instance.discardTestsInDraft();
      expect(props.deleteDraftLabOrder).toBeCalled();
    });

    it('should toggle the urgency state of a test', () => {
      const instance = mountedComponent.instance();
      instance.handleUrgencyChange();
      expect(props.toggleDraftLabOrdersUgency).toBeCalled();
    });
  });
});
