import React from 'react';
import { Draft } from '../../app/js/components/Draft';

let props;
let mountedComponent;

props = {
  draftOrders: [
    { uuid: 6, display: 'hermatocrite', set: true, type: 'laborder' }
  ],
  handleSubmit: jest.fn(),
  handleDraftDiscard: jest.fn(),
  toggleDraftLabOrderUrgency: jest.fn(),
  editDraftDrugOrder: jest.fn(),
};

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Draft {...props} />);
  }
  return mountedComponent;
};

describe('Component: Draft', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render on initial setup', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('should display the action buttons', () => {
    const component = getComponent();
    const actionButton = component.find('.action-btn');
    expect(actionButton.length).toEqual(2);
  });

  it('Should be able to display drug data to the list', () => {
    const component = getComponent();
    component.setProps({ draftOrders: [
      { uuid: 6, drugName: 'paracetamol' }
    ]});
    const draftName = component.find('.draft-name');
    expect(draftName.exists()).toBeTruthy();
    expect(draftName.props().children).toEqual('paracetamol');
  });

  it('Should simulate the discard event', () => {
    const component = getComponent();
    component.setProps({ draftOrders: [
      { uuid: 6, drugName: 'paracetamol' },
      { uuid: 7, display: 'hermatology', action: 'NEW', type: 'drugorder'}
    ]});
    const discardButton = component.find('#draft-discard-all');
    discardButton.simulate('click', {});
    expect(props.handleDraftDiscard).toBeCalled();
  });
});

