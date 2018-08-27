import React from 'react';
import { LabEntryForm, mapStateToProps } from '../../../app/js/components/labOrderEntry/LabEntryForm';
import {
  addDraftLabOrders,
  deleteDraftLabOrder,
} from '../../../app/js/actions/draftLabOrderAction';

import { panelData, testsData } from '../../../app/js/components/labOrderEntry/labData';

let props;
let mountedComponent;

props = {
  draftLabOrders: [
    { display: 'Hemoglobin', uuid: '12746hfgjff' },
    { display: 'Hematocrit', uuid: '12746hfgjff' },
    { display: 'blood', uuid: '12746hfgjff' },
  ],
  defaultTests: [
    { display: 'Hemoglobin', uuid: '12746hfgjff' },
    { display: 'Hematocrit', uuid: '12746hfgjff' },
    { display: 'blood', uuid: '12746hfgjff' },
  ],
  dateFormat: 'DD-MM-YYYY HH:mm',
  selectedTests: [
    { display: 'Hemoglobin', uuid: '12746hfgjff' },
    { display: 'Hematocrit', uuid: '12746hfgjff' },
    { display: 'blood', uuid: '12746hfgjff' },
  ],
  selectedLabPanels: [panelData[0]],
  dispatch: jest.fn(),
  addDraftLabOrdersToStore: addDraftLabOrders,
  deleteDraftLabOrderFromStore: deleteDraftLabOrder,
  fetchLabOrders: jest.fn(),
  labOrders: {
    results: [
      {
        uuid: '1',
        dateActivated: '2018-08-27T10:23:22.228Z',
        concept: {
          display: 'Hemoglobin blood test',
        },
      },
    ],
  },
  createLabOrder: jest.fn(() => {}),
  createLabOrderReducer: {
    status: {
      error: false,
      added: true,
    },
    labOrderData: {},
  },
  session: {
    currentProvider: {
      uuid: 'jfhfhiu77474',
    },
  },
  patient: {
    uuid: 'jfgfhfgf',
  },
  conceptsAsTests: [],
  conceptsAsPanels: [],
  encounterType: {
    uuid: 'fhhfgfh9998',
  },
  inpatientCareSetting: {
    uuid: 'ifffy9847464',
  },
  encounterRole: {
    uuid: '1234trrrrr',
  },
  orderables: [
    { uuid: 'ifffy9847464', display: 'Hemoglobin', concept: '12746hfgjff' },
    { uuid: 'iewue7wyu64', display: 'Hematocrit', concept: '12746hfgjff' },
    { uuid: 'iuweihiYWGD64', display: 'blood', concept: '12746hfgjff' },
  ],
  getLabOrderables: 'buo434873euhwiqeroq',
};

let mockPanel = panelData[0];

const mockTest = testsData[0];

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mount(<LabEntryForm {...props} />);
  }
  return mountedComponent;
};

mockPanel = {
  uuid: '888ya-kkk',
  display: 'Concept B',
  set: true,
  setMembers: [
    { uuid: '456Abc-123', name: 'Concept D', set: false },
    { uuid: '138Abc-466', name: 'Concept E', set: false },
    { uuid: '123Def-456', name: 'Concept F', set: false },
  ],
},

describe('Component: LabEntryForm', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render on initial setup', () => {
    const component = getComponent();
    mapStateToProps({
      draftReducer: { draftLabOrders: { orders: [] } },
      dateFormatReducer: { dateFormat: 'DD-MM-YYYY HH:mm' },
      patientReducer: { patient: {} },
      fetchLabOrderReducer: { labOrders: [] },
      labConceptsReducer: { conceptsAsTests: [], conceptsAsPanels: [] },
      openmrs: { session: {} },
      encounterRoleReducer: { encounterRole: {} },
      encounterReducer: { encounterType: {} },
      careSettingReducer: { inpatientCareSetting: {} },
      labOrderableReducer: { orderables: [] },
      getLabOrderablesReducer: { getLabOrderables: '' },
    });
    expect(component).toMatchSnapshot();
  });

  it('should be able to select a category', () => {
    const component = getComponent();
    const categoryButton = component.find('#category-button').at(1); // click on the second category iwth id of 2
    categoryButton.simulate('click', {
      target: {},
    });
    expect(component.state().categoryUUID).toEqual('iewue7wyu64');
  });

  it('should dispatch an action to remove a test panel from the draft', () => {
    const instance = getComponent().instance();
    instance.state.selectedPanelIds = [mockPanel.uuid];

    const dipatch = jest.spyOn(props, 'dispatch');
    instance.handleTestSelection(mockPanel, 'panel');
    expect(dipatch).toBeCalled();
  });

  it('should dispatch an action to add a test panel to the draft', () => {
    const instance = getComponent().instance();

    const dipatch = jest.spyOn(props, 'dispatch');
    instance.handleTestSelection(mockPanel, 'panel');
    expect(dipatch).toBeCalled();
  });

  it('should dispatch an action to handle single test selection', () => {
    const instance = getComponent().instance();
    instance.state.selectedPanelIds = [1];

    const dispatch = jest.spyOn(props, 'dispatch');
    instance.handleTestSelection(mockTest, 'single');
    expect(dispatch).toBeCalled();
  });

  it('should dispatch an action to handle single test deletion', () => {
    const instance = getComponent().instance();
    instance.state.selectedPanelIds = [1];

    const dispatch = jest.spyOn(props, 'dispatch');
    instance.discardTestsInDraft(mockTest, 'single');
    expect(dispatch).toBeCalled();
  });

  it('should dispatch an action to handle panel deletion', () => {
    const instance = getComponent().instance();
    instance.state.selectedPanelIds = [1];

    const dispatch = jest.spyOn(props, 'dispatch');
    instance.discardTestsInDraft(mockPanel, 'panel');
    expect(dispatch).toBeCalled();
  });

  it('should dispatch an action to handle deletion of all items from the draft', () => {
    const instance = getComponent().instance();
    instance.state.selectedPanelIds = [1];

    const dispatch = jest.spyOn(props, 'dispatch');
    instance.discardTestsInDraft();
    expect(dispatch).toBeCalled();
  });

  it('should toggle the urgency state of a test', () => {
    const instance = getComponent().instance();
    const dispatch = jest.spyOn(props, 'dispatch');
    instance.handleUrgencyChange();
    expect(dispatch).toBeCalled();
  });

  it(`should change the default lab form's tests category by toggling component state`, () => {
    const component = getComponent();
    const instance = component.instance();
    const defaultCategory = instance.state.categoryUUID;
    component
      .find('#category-button')
      .at(2)
      .simulate('click', {});
    expect(instance.state.categoryUUID !== defaultCategory);
  });

  it('shows a toast prompt when test is submitted successfully', () => {
    const component = getComponent();
    const addButton = component.find('.confirm');
    addButton.simulate('click', {});

    component.setProps({
      ...component.props(),
      createLabOrderReducer: {
        status: {
          error: false,
          added: true,
        },
        labOrderData: { uuid: 'kjdhggf', display: 'order Entry', orders: [{ display: 'true' }] },
      },
    });
    expect(global.toastrMessage).toEqual('lab order successfully created');
  });

  it('shows a toast prompt when there is an error in submission', () => {
    const component = getComponent();
    const addButton = component.find('.confirm').at(0);
    addButton.simulate('click', {});
    component.setProps({
      ...component.props(),
      createLabOrderReducer: {
        status: {
          error: true,
          added: false,
        },
        labOrderData: {},
        errorMessage: 'an error occured',
      },
    });
    expect(global.toastrMessage).toEqual('an error occured');
  });

  it(`does not render the past order component if the
  length of the results props is less than 1`, () => {
    const component = getComponent();
    component.setProps({
      ...component.props(),
      labOrders: { results: [] },
    });
    expect(component.find('PastOrders').exists()).toBeFalsy();
  });

  it('should have lab orderables displayed in the category list', () => {
    const component = getComponent();
    const categoryButton = component.find('#category-button');
    expect(categoryButton.length).toEqual(3);
  });
});
