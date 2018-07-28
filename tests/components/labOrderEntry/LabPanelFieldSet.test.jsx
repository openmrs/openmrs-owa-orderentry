import React from 'react';
import LabPanelFieldSet from '../../../app/js/components/labOrderEntry/LabPanelFieldSet';

let props;
let mountedComponent;
props = {
  handleTestSelection: jest.fn(),
  selectedPanelIds: [1, 2],
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
    const handleTestSelection = jest.spyOn(props, 'handleTestSelection');
    const panelButton = component.find('#panel-button').at(0); // click the second button
    panelButton.simulate('click', {});
    expect(handleTestSelection).toBeCalled();
  });
});
