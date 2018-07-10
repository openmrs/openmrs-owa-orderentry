import React from 'react';
import LabTestFieldSet from '../../../app/js/components/labOrderEntry/LabTestFieldSet';

let props;
let mountedComponent;
props = {
  selectedTests: [
    { id: 1, test: 'Hemoglobin' },
    { id: 2, test: 'Hematocrit' },
    { id: 3, test: 'blood' },
  ],
  selectTest: () => jest.fn()
};

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<LabTestFieldSet { ...props } />);
  }
  return mountedComponent;
};

describe('Component: LabTestFieldSet', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should mount initially', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('should support click for each button rendered', () => {
    const component = getComponent();
    const testButton = component.find('#category-test-button').at(0); // click the second button
    testButton.simulate('click', {});
    expect(component).toMatchSnapshot();
  });
});
