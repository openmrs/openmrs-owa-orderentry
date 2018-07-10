import React from 'react';
import LabPanelFieldSet from '../../../app/js/components/labOrderEntry/LabPanelFieldSet';

let props;
let mountedComponent;
props = {
  selectTests: jest.fn(),
  selectPanel: jest.fn()
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
    const instance = component.instance();
    sinon.spy(instance, 'setPanel');
    const panelButton = component.find('#panel-button').at(0); // click the second button
    panelButton.simulate('click', {});
    expect(instance.setPanel.calledOnce).toEqual(true);
  });
});
