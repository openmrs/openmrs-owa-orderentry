import React from 'react';
import LabPanelFieldSet from '../../../app/js/components/labOrderEntry/LabPanelFieldSet';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<LabPanelFieldSet { ...props } />);
  }
  return mountedComponent;
};

describe('Component: LabPanelFieldSet', () => {
  beforeEach(() => {
    mountedComponent = undefined;
    props = {
      handleTestSelection: jest.fn(),
      selectedPanelIds: [],
      panels: [{
        uuid: 'asampleduuid1234',
        display: 'sample',
        setMembers: [{
          uuid: 'asampleduuid1234',
          display: 'sample'
        }]
      }]
    };
  });

  it('should mount initially', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('should support click for each button rendered', () => {
    const component = getComponent();
    const panelButton = component.find('#panel-button').at(0);
    panelButton.simulate('click', {});
    expect(props.handleTestSelection).toBeCalled();
  });

  it('should add class `active` to the slected panels', () => {
    props.selectedPanelIds = ['asampleduuid1234'];
    const component = getComponent();
    const activePanelButton = component.find('.active.lab-tests-btn');
    expect(activePanelButton.length).toEqual(1);
  });
});
