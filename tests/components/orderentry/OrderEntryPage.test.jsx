import React from 'react';
import { OrderEntryPage } from '../../../app/js/components/orderEntry/OrderEntryPage';
import  SearchAndAddOrder from '../../../app/js/components/orderEntry/SearchAndAddOrder';


describe('Test for Order entry page when order.encounterType is set', () => {
  const props = {
    fetchPatientCareSetting: jest.fn(),
    getSettingEncounterType: jest.fn(),
    settingEncounterTypeReducer: {
      settingEncounterType: 'order type',
      error: '',
    },
    outpatientCareSetting: {uuid: '5677666'},
    inpatientCareSetting: {uuid: '6766667'}
  }
  let wrapper;  
  beforeEach(() => {
    wrapper = shallow(<OrderEntryPage {...props} />  );
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
  const props = {
    fetchPatientCareSetting: jest.fn(),
    getSettingEncounterType: jest.fn(),
    settingEncounterTypeReducer: {
      settingEncounterType: '',
      error: 'Property can not be found',
    },
    outpatientCareSetting: {uuid: '5677666'},
    inpatientCareSetting: {uuid: '6766667'}
  }
  let wrapper;  
  beforeEach(() => {
    wrapper = shallow(<OrderEntryPage {...props} />  );
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
