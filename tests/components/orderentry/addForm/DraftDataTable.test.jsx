import React from 'react';

import DraftDataTable from '../../../../app/js/components/orderEntry/addForm/DraftDataTable';

const props = {
    handleDiscardOneOrder: jest.fn(),
    handleDiscardAllOrders: jest.fn(),
    draftOrders: [
      {
        action: 'DISCONTINUE',
        drugName: 'panadol',
        orderNumber: 3
      },
    ]
};

const setup = () => {
  const wrapper = shallow(<DraftDataTable {...props} store={store} />);
  return { wrapper }
}

describe('Draft Data Table', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(props.handleDiscardOneOrder.mock.calls.length).toEqual(0);
    expect(wrapper).toMatchSnapshot()
  });
});
