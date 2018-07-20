import React from 'react';
import { LabEntryForm } from '../../../app/js/components/labOrderEntry/LabEntryForm';
import {
  addDraftLabOrders,
  deleteDraftLabOrder
} from '../../../app/js/actions/draftLabOrderAction';

import { panelData, testsData } from '../../../app/js/components/labOrderEntry/labData';

let props;
let mountedComponent;

props = {
  draftLabOrders: [
    { id: 1, test: 'Hemoglobin' },
    { id: 2, test: 'Hematocrit' },
    { id: 3, test: 'blood' },
  ],
  defaultTests: [
    { id: 1, test: 'Hemoglobin' },
    { id: 2, test: 'Hematocrit' },
    { id: 3, test: 'blood' },
  ],
  selectedLabPanels: [panelData[0]],
  dispatch: jest.fn(),
};

const mockTest = testsData[0];

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<LabEntryForm {...props} />);
  }
  return mountedComponent;
};

const mockPanel = { id: 1, tests: [
  { id: 4, test: 'liver' },
  { id: 5, test: 'sickling' },
  { id: 6, test: 'prothrombin' },
] };

describe('Component: LabEntryForm', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render on initial setup', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('should be able to select a category', () => {
    const component = getComponent();
    const categoryButton = component.find('#category-button').at(1); // click on the second category iwth id of 2
    categoryButton.simulate('click', {
      target: {}
    });
    expect(component.state().categoryId).toEqual(2);
  });

  it('should dispatch an action to handle test panel selection', () => {
    const instance = getComponent().instance();
    instance.state.selectedPanelIds = [1];

    const dipatch = jest.spyOn(props, 'dispatch');
    instance.handleTestSelection(mockPanel, 'panel');
    expect(dipatch).toBeCalled();
  });

  it('should dispatch an action to handle single test selection', () => {
    const instance = getComponent().instance();
    instance.state.selectedPanelIds = [1];

    const dipatch = jest.spyOn(props, 'dispatch');
    instance.handleTestSelection(mockTest, 'single');
    expect(dipatch).toBeCalled();
  });

  it(`should change the default lab form's tests category by toggling component state`, () => {
    const component = getComponent();
    const instance = component.instance();
    const defaultCategory = instance.state.categoryId;
    component.find('#category-button').at(2).simulate('click', {});
    expect(instance.state.categoryId !== defaultCategory)
  });
});
