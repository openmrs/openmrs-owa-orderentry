import React from 'react';
import { LabDraftOrder } from '../../../app/js/components/labOrderEntry/DraftOrder/LabDraftOrder';

let props;
let mountedComponent;
props = {
  draftLabOrders: [],
  disableCancelButton: true,
  disableSaveButton: true,
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
});
