import React from 'react';
import { OrderEntryPage } from '../../../app/js/components/orderEntry/OrderEntryPage';
import  SearchAndAddOrder from '../../../app/js/components/orderEntry/SearchAndAddOrder';

const props = {
  fetchPatientCareSetting: jest.fn(),
  getSettingEncounterType: jest.fn(),
  getSettingEncounterRole: jest.fn(),
  settingEncounterTypeReducer: {
    settingEncounterType: '',
    error: '',
  },
  settingEncounterRoleReducer: {
    settingEncounterRole: '',
    roleError: '',
  },
  outpatientCareSetting: {uuid: '5677666'},
  inpatientCareSetting: {uuid: '6766667'}
}

describe('Test for Order entry page when order.encounterType is set', () => {
  const typeProps = {
    ...props,
    settingEncounterTypeReducer: {
      ...props.settingEncounterTypeReducer,
      settingEncounterType: 'order type',
    },
  }
  let wrapper;  
  beforeEach(() => {
    wrapper = shallow(<OrderEntryPage {...typeProps} />  );
  })
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it('should render SearchAndAddOrder Component ', () => {
    expect(wrapper.find(SearchAndAddOrder).length).toBe(1);
  });
  it('should not show error', () => {
    expect(wrapper.find('div.error-notice').length).toBe(0);
  });
});

describe('Test for Order entry page when order.encounterType is not set', () => {
  const typeProps = {
    ...props,
    settingEncounterTypeReducer: {
      ...props.settingEncounterTypeReducer,
      error: 'Property can not be found',
    },
  }
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<OrderEntryPage {...typeProps} />  );
  })
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it('should not render SearchAndAddOrder Component ', () => {
    expect(wrapper.find(SearchAndAddOrder).length).toBe(0);
  });
  it('should show error', () => {
    expect(wrapper.find('div.error-notice').length).toBe(1);
  });
});

describe('Test for Order entry page when order.encounterRole is set', () => {
  const roleProps = {
    ...props,
    settingEncounterRoleReducer: {
      ...props.settingEncounterRoleReducer,
      settingEncounterRole: 'clinician',
    },
  }
  let wrapper;  
  beforeEach(() => {
    wrapper = shallow(<OrderEntryPage {...roleProps} />  );
  })
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it('should render SearchAndAddOrder Component ', () => {
    expect(wrapper.find(SearchAndAddOrder).length).toBe(1);
  });
  it('should not show error', () => {
    expect(wrapper.find('div.error-notice').length).toBe(0);
  });
});

describe('Test for Order entry page when order.encounterRole is not set', () => {
  const roleProps = {
    ...props,
    settingEncounterRoleReducer: {
      ...props.settingEncounterRoleReducer,
      roleError: 'Property can not be found',
    },
  }
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<OrderEntryPage {...roleProps} />  );
  })
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it('should not render SearchAndAddOrder Component ', () => {
    expect(wrapper.find(SearchAndAddOrder).length).toBe(0);
  });
  it('should show error', () => {
    expect(wrapper.find('div.error-notice').length).toBe(1);
  });
});
