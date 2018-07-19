import React from 'react';
import LabPanelFieldSet from '../../../app/js/components/labOrderEntry/LabPanelFieldSet';

let props;
let mountedComponent;
props = {
  selectPanelTests: jest.fn(),
};

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<LabPanelFieldSet { ...props } />);
  }
  return mountedComponent;
};

describe('Component: LabPanelFieldSet', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should mount initially', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('should support click for each button rendered', () => {
    const component = getComponent();
    const panelButton = component.find('#panel-button').at(0); // click the second button
    panelButton.simulate('click', {});
    expect(props.selectPanelTests).toBeCalled();
  });
});
