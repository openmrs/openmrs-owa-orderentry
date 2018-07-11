import React from 'react';
import { LabEntryForm, mapStateToProps } from '../../../app/js/components/labOrderEntry/LabEntryForm';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<LabEntryForm createLabOrder={jest.fn(() => {})} />);
  }
  return mountedComponent;
};

const mockTest = [1, 2, 3];
const mockPanel = { id: 1 };

describe('Component: LabEntryForm', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render on initial setup', () => {
    const component = getComponent();
    mapStateToProps({});
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

  it('should set the seleted tests state of the component', () => {
    const component = getComponent();
    const instance = component.instance();
    instance.selectTests(mockTest);
    expect(component.state().selectedTests.includes(1)).toBeTruthy();
  });

  it('should add and remove test options when selected and deselected', () => {
    const component = getComponent();
    const instance = component.instance();
    instance.setState({
      selectedTests: mockTest
    });
    let newTestId = 4;
    instance.selectTest(newTestId);
    expect(component.state().selectedTests.includes(4)).toBeTruthy();
    instance.selectTest(newTestId);
    expect(component.state().selectedTests.includes(4)).toBeFalsy();
  });

  it('should set the id of the selected panel when the selectPanel is called', () => {
    const component = getComponent();
    const instance = component.instance();
    instance.selectPanel(mockPanel);
    expect(component.state().selectedPanel).toEqual(1);
  });

  it('should submit the form', () => {
    const component = getComponent();
    const addButton = component.find('#add-lab-order').at(0); // click the second button
    addButton.simulate('click', {});
    expect(component.state().selectedTests).toEqual([]);
    expect(component.state().disableSaveButton).toBeTruthy();
    expect(component.state().disableCancelButton).toBeTruthy();
  });

  it('shows a toast prompt when test is submitted successfully', () => {
    const component = getComponent();
    const addButton = component.find('#add-lab-order').at(0);
    addButton.simulate('click', {});
    component.setProps({
      createLabOrderReducer: {
        status: {
          error: false,
          added: true,
        },
      },
    });
    const toastPromptDiv = component.find('.toast-message')
    expect(toastPromptDiv.exists());
  });

  it('shows a toast prompt when there is an error in submission', () => {
    const component = getComponent();
    const addButton = component.find('#add-lab-order').at(0);
    addButton.simulate('click', {});
    component.setProps({
      createLabOrderReducer: {
        status: {
          error: true,
          added: false,
        },
      },
    });
    const toastPromptDiv = component.find('.toast-message')
    expect(toastPromptDiv.exists());
  });
});
