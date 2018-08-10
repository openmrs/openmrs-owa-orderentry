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

  it('should toggle draftOrder Urgency from routine to STAT', () => {
    const event = { preventDefault: () => {} };
    jest.spyOn(event, 'preventDefault');
    const component = getComponent();
    const handleToggleDraftOrderUgency = jest.spyOn(props, 'toggleDraftLabOrdersUgency');
    component.find('#draft-toggle-btn').at(0).simulate('click', event);
    expect(handleToggleDraftOrderUgency).toBeCalled();
    expect(event.preventDefault).toBeCalled();
  });

  it('should toggle draftOrder Urgency from STAT to routine', () => {
    props.draftLabOrders = [
        { uuid: 6, display: 'prothrombin', urgency: constants.STAT }
      ]
    const event = { preventDefault: () => {} };
    jest.spyOn(event, 'preventDefault');
    const component = getComponent();
    const handleToggleDraftOrderUgency = jest.spyOn(props, 'toggleDraftLabOrdersUgency');
    component.find('#draft-toggle-btn').at(0).simulate('click', event);
    expect(handleToggleDraftOrderUgency).toBeCalled();
    expect(event.preventDefault).toBeCalled();
  });

  it('should toggle draftOrder Urgency from undefined to ROUTINE', () => {
    props.draftLabOrders = [
        { uuid: 6, display: 'prothrombin' }
      ]
    const event = { preventDefault: () => {} };
    jest.spyOn(event, 'preventDefault');
    const component = getComponent();
    const handleToggleDraftOrderUgency = jest.spyOn(props, 'toggleDraftLabOrdersUgency');
    component.find('#draft-toggle-btn').at(0).simulate('click', event);
    expect(handleToggleDraftOrderUgency).toBeCalled();
    expect(event.preventDefault).toBeCalled();
  });

  it('should handle discarding items from the draftOrder', () => {
    const event = { preventDefault: () => {} };
    jest.spyOn(event, 'preventDefault');
    const component = getComponent();
    const handleDraftDiscard = jest.spyOn(props, 'handleDraftDiscard');
    component.find('#draft-discard-btn').at(0).simulate('click', event);
    expect(handleDraftDiscard).toBeCalled();
    expect(event.preventDefault).toBeCalled();
  });

  it('should handle discarding items from the draftOrder', () => {
    const event = { preventDefault: () => {} };
    jest.spyOn(event, 'preventDefault');
    const component = getComponent();
    const handleDraftDiscard = jest.spyOn(props, 'handleDraftDiscard');
    component.find('#draft-discard-all').at(0).simulate('click', event);
    expect(handleDraftDiscard).toBeCalled();
  });
});
