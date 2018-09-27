import React from 'react';
import { LabDraftOrder } from '../../../app/js/components/labOrderEntry/LabDraftOrder';
import constants from '../../../app/js/utils/constants.js';

let props;
let mountedComponent;
props = {
  draftLabOrders: [
    { uuid: 6, display: 'prothrombin', urgency: constants.ROUTINE }
  ],
  panelTests: [],
  toggleDraftLabOrdersUgency: jest.fn(),
  disableCancelButton: true,
  disableSaveButton: true,
  handleSubmit: jest.fn(),
  handleDraftDiscard: jest.fn(),
};

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<LabDraftOrder {...props} />);
  }
  return mountedComponent;
};

describe('Component: LabDraftOrder', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render on initial setup', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it(`toggleDraftLaborderUrgency prop function is dispatched
  when toggling urgency from ROUTINE to STAT`, () => {
    const event = { preventDefault: () => {} };
    const component = getComponent();
    component.find('#draft-toggle-btn').at(0).simulate('click', event);
    expect(props.toggleDraftLabOrdersUgency).toBeCalled();
  });

  it(`toggleDraftLaborderUrgency prop function is dispatched
  when toggling urgency from STAT to ROUTINE`, () => {
    const event = { preventDefault: jest.fn() };
    const component = getComponent();
    component.setProps({
      ...component.props(),
      draftLabOrders: [
        { uuid: 6, display: 'prothrombin', urgency: constants.STAT },
      ],
    });
    component.find('#draft-toggle-btn').at(0).simulate('click', event);
    expect(props.toggleDraftLabOrdersUgency).toBeCalled();
  });

  it(`toggleDraftLaborderUrgency prop function is dispatched
  when toggling urgency from undefined to ROUTINE`, () => {
    props.draftLabOrders = [
        { uuid: 6, display: 'prothrombin' }
      ]
    const event = { preventDefault: () => {} };
    const component = getComponent();
    component.find('#draft-toggle-btn').at(0).simulate('click', event);
    expect(props.toggleDraftLabOrdersUgency).toBeCalled();
  });

  it(`handleDraftDiscard action is dispatched if the
  corresponding discard button is clicked`, () => {
    const event = { preventDefault: () => {} };
    const component = getComponent();
    component.find('#draft-discard-btn').at(0).simulate('click', event);
    expect(props.handleDraftDiscard).toBeCalled();
  });

  it(`handleDraftDiscard action is dispatched if the
  discard all button is clicked`, () => {
    const event = { preventDefault: () => {} };
    const component = getComponent();
    component.find('#draft-discard-all').at(0).simulate('click', event);
    expect(props.handleDraftDiscard).toBeCalled();
  });
});
