import React from 'react';
import { AllOrders } from '../../../app/js/components/orderEntry/AllOrders';

describe('AllOrders test-suite', () => {
  const props = {
    orders: {
      totalCount: 20,
    },
    dispatch: jest.fn(),
    patient: {
      uuid: '',
    },
  };
  const wrapper = shallow(<AllOrders {...props} />);
  it('renders component properly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('sets the pagination urls in the Paginate component', () => {
    wrapper.setProps({
      ...wrapper.props(),
      orders: {
        totalCount: 20,
        links: [
          {
            rel: 'next',
            uri: 'next-page-url'
          },
          {
            rel: 'prev',
            uri: 'prev-page-url'
          }
        ]
      },
    });
    expect(wrapper.find('Paginate').props().nextPageUrl).toEqual('next-page-url');
    expect(wrapper.find('Paginate').props().prevPageUrl).toEqual('prev-page-url');
  });
});
