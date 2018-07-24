import React from 'react';
import { DraftList } from '../../../app/js/components/labOrderEntry/DraftOrder/DraftList';

let props;
let mountedComponent;
props = {
  draftOrders: [{ id: 1, test: 'Hemoglobin' }]
};

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<DraftList {...props} />);
  }
  return mountedComponent;
};

describe('Component: DraftList', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render on initial setup', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });
});
