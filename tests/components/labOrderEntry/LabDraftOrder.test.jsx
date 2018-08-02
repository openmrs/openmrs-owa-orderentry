import React from 'react';
import { LabDraftOrder } from '../../../app/js/components/labOrderEntry/LabDraftOrder';

let props;
let mountedComponent;
props = {
  draftLabOrders: [
    { id: 6, test: 'prothrombin', urgency: 'routine' }
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
    props = {
      draftLabOrders: [
        { id: 6, test: 'prothrombin', urgency: 'STAT' }
      ],
      ...props,
    }
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
