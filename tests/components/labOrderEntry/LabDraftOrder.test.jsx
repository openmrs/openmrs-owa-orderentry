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

  it('should toggle draftOrder Urgency', () => {
    const component = getComponent();
    const handleToggleDraftOrderUgency = jest.spyOn(props, 'toggleDraftLabOrdersUgency');
    component.find('#draft-toggle-btn').at(0).simulate('click', {});
    expect(handleToggleDraftOrderUgency).toBeCalled();
  });
});
