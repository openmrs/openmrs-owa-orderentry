import React from 'react';
import { LabEntryForm } from '../../../app/js/components/labOrderEntry/LabEntryForm';
import {
  addDraftLabOrders,
  deleteDraftLabOrder
} from '../../../app/js/actions/draftLabOrderAction';

let props;
let mountedComponent;
const dispatch = jest.fn();
props = {
  addDraftLabOrdersToStore: addDraftLabOrders,
  deleteDraftLabOrderFromStore: deleteDraftLabOrder,
};

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<LabEntryForm {...props} />);
  }
  return mountedComponent;
};

const mockTest = [
  { id: 1, test: 'Hemoglobin' },
  { id: 2, test: 'Hematocrit' },
  { id: 3, test: 'blood' },
];

const mockSingleTest = mockTest[0];

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

  it('should add and remove all the tests belonging to a panel as default tests', () => {
    const component = getComponent();
    const instance = component.instance();
    instance.selectPanelTests(mockPanel);
    expect(component.state().defaultTests.length).toEqual(3);
    instance.selectPanelTests(mockPanel);
    expect(component.state().defaultTests.length).toEqual(0);
  });

  it('should add and remove test options when selected and deselected', () => {
    const component = getComponent();
    const instance = component.instance();
    instance.setState({
      selectedTests: mockTest
    });
    instance.selectTest(mockSingleTest); // Remove an already existing test
    expect(component.state().selectedTests.length).toEqual(2);
    instance.selectTest(mockSingleTest);
    expect(component.state().selectedTests.length).toEqual(3);
  });

  it('should submit the form', () => {
    const component = getComponent();
    const instance = component.instance();
    instance.handleSubmit();
    expect(component.state().selectedTests).toEqual([]);
  });
});
