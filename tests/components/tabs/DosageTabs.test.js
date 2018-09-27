import React from 'react';
import DosageTabs from '../../../app/js/components/tabs/DosageTabs';
import mockData from '../../../__mocks__/mockData';

const props = {
  children: [],
  handleFormTabs: jest.fn(),
  formType: jest.fn(),
};

let mountedComponent;
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<DosageTabs {...props} />);
  }
  return mountedComponent;
};

describe('Dosage Tab component', () => {
  it('should render without crashing', () => {
    expect(getComponent()).toMatchSnapshot();
  });
});

describe('handleTabClick() method', () => {
  it('dispatches handleFormTabs, FormType props when triggered', () => {
    const componentMethod = getComponent().instance();
    componentMethod.handleTabClick(0, 'Free Text');
    expect(props.handleFormTabs).toBeCalled();
    expect(props.formType).toBeCalled();
  });
});
