import React from 'react';
import { Draft } from '../../app/js/components/Draft';

let props;
let mountedComponent;

props = {
  draftOrders: [
    { uuid: 6, display: 'prothrombin' }
  ],
  handleSubmit: jest.fn(),
  handleDraftDiscard: jest.fn(),
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

  it('Should simulate the submit event', () => {
    const component = getComponent();
    const submitButton = component.find('#draft-discard-all');
    submitButton.simulate('click', {});
    expect(props.handleDraftDiscard).toBeCalled();
  });
});

