import React from 'react';
import DosageTabs from '../../../app/js/components/tabs/DosageTabs'
import mockData from '../../../__mocks__/mockData';

const props = {
    children:[],
    handleFormTabs: jest.fn(),
    formType: jest.fn(),
}

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
    it('should call handleTabClick()', () => {
      const renderedComponent = getComponent().instance();
      sinon.spy(renderedComponent, 'handleTabClick');
      renderedComponent.handleTabClick(0, 'Free Text');
      expect(renderedComponent.handleTabClick.calledOnce).toEqual(true);
    });
});
