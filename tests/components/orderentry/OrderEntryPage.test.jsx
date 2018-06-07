import React from 'react';
import ConnectedOrderEntryPage, { OrderEntryPage } from '../../../app/js/components/orderEntry/OrderEntryPage';
import SearchAndAddOrder from '../../../app/js/components/orderEntry/SearchAndAddOrder';

let props;

let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<SearchDrug {...props} />);
  }
  return mountedComponent;
};

describe('Test for Order entry page when order.encounterType is set', () => {
  beforeEach(() => {
    props = {
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
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

  it('should render SearchAndAddOrder Component ', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find(SearchAndAddOrder).length).toBe(1);
  });
  it('should not show error', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div.error-notice').length).toBe(0);
  });
});

describe('Test for Order entry page when order.encounterType is not set', () => {
  beforeEach(() => {
    props = {
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
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
  it('should not render SearchAndAddOrder Component ', () => {
    props.settingEncounterTypeReducer = {
      settingEncounterType: '',
      error: 'Property can not be found',
    }
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find(SearchAndAddOrder).length).toBe(0);
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

describe('Test for Order entry page when order.encounterRole is set', () => {
  beforeEach(() => {
    props = {
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
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

  it('should render SearchAndAddOrder Component ', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find(SearchAndAddOrder).length).toBe(1);
  });
  it('should not show error', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div.error-notice').length).toBe(0);
  });
});

describe('Test for Order entry page when order.encounterRole is not set', () => {
  beforeEach(() => {
    props = {
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
      getDateFormat: jest.fn(),
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

  it('should not render SearchAndAddOrder Component ', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find(SearchAndAddOrder).length).toBe(0);
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

  it('should render SearchAndAddOrder Component ', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find(SearchAndAddOrder).length).toBe(1);
  });
  it('should not show error', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find('div.error-notice').length).toBe(0);
  });
});

describe('Test for Order entry page when order.encounterRole is not set', () => {
  beforeEach(() => {
    props = {
      fetchPatientCareSetting: jest.fn(),
      getSettingEncounterType: jest.fn(),
      getSettingEncounterRole: jest.fn(),
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
        dateFormat: '',
        error: 'incomplete config',
      },
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'}
    };
    mountedComponent = undefined;
  });

  it('should not render SearchAndAddOrder Component ', () => {
    mountedComponent = shallow(<OrderEntryPage {...props} />);
    expect(mountedComponent.find(SearchAndAddOrder).length).toBe(0);
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
    const wrapper = shallow(<ConnectedOrderEntryPage store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
