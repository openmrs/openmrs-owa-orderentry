import React from 'react';
import configureStore from 'redux-mock-store';
import ConnectedOrdersTablePage, { OrdersTable } from '../../../app/js/components/orderEntry/OrdersTable';

const mockStore = configureStore();

describe('Orders component test-suite', () => {
  it('renders properly', () => {
    const props = {
      filteredOrders: [
        {
          activeDates: '24/12/2018',
          display: 'Paracetamol',
          type: 'drugorder',
          dosingInstructions: '25mg of Amoxycillin syrup for the next 5 days',
          dispense: '45',
          orderer: { display: 'Mark Goodrich' },
          urgency: 'STAT',
          uuid: 2,
        },
        {
          activeDates: '24/12/2018',
          display: 'Paracetamol',
          type: 'testorder',
          orderer: { display: 'Mark Goodrich' },
          urgency: 'STAT',
          uuid: 2,
        },
      ],
      dateFormatReducer: { dateFormat: '', },
      status: {
        fetched: true,
      },
      patient: {
        uuid: 'some-random-id',
      },
      dispatch: jest.fn(),
    };
    const wrapper = mount(<OrdersTable {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('Accordion').exists()).toBeTruthy();
    wrapper.setProps({
      ...wrapper.props(),
      patient: {
        uuid: 'some-random-id2',
      },
    });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('Accordion').exists()).toBeTruthy();
  });

  it('does not render any data if the result array is empty', () => {
    const store = mockStore({
      patientReducer: {
        patient: {
          patientId: 'some-random-id',
          uuid: 'some-random-id',
          patientIdentiier: { uuid: 'some-random-uuid' },
          person: { gender: 'M', age: 12, birthdate: '2006-08-08T00:00:00.000+0100' },
          personName: { display: 'joey bart' },
        },
      },
      fetchOrdersReducer: {
        filteredOrders: [],
        status: {
          fetched: true,
        },
      },
      dateFormatReducer: { dateFormat: '', }
    });
    const props = {
      location: { search: '?patient=esere_shbfidfb_343ffd' },
    };
    const wrapper = mount(<ConnectedOrdersTablePage store={store} {...props} />);
    expect(wrapper.find('.no-result-info').props().children).toEqual('No Orders');
  });
});
