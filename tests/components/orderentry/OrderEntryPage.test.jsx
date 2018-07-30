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
      getLabOrderable: jest.fn(),
      getDateFormat: jest.fn(),
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
      location: {search: '?patient=esere_shbfidfb_343ffd'}
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
});

describe('Test for Order entry page when orderentryowa.encounterType is not set', () => {
  beforeEach(() => {
    props = {
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
      getLabOrderable: jest.fn(),
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
      location: {search: '?patient=esere_shbfidfb_343ffd'}
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
      getLabOrderable: jest.fn(),
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
      location: {search: '?patient=esere_shbfidfb_343ffd'}
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
      getLabOrderable: jest.fn(),
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
      location: {search: '?patient=esere_shbfidfb_343ffd'}
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
      getLabOrderable: jest.fn(),
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
      location: {search: '?patient=esere_shbfidfb_343ffd'}
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
      getLabOrderable: jest.fn(),
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
      location: {search: '?patient=esere_shbfidfb_343ffd'}
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
    });
    const props = {
      location: {search: '?patient=esere_shbfidfb_343ffd'}
    }
    const wrapper = shallow(<ConnectedOrderEntryPage store={store} {...props}/>);
    expect(wrapper.length).toBe(1);
  });
});
