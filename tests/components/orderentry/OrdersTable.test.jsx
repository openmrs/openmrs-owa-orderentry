import React from 'react';
import configureStore from 'redux-mock-store';
import ConnectedOrdersTablePage, { OrdersTable } from '../../../app/js/components/orderEntry/OrdersTable';
import createLabOrder from '../../../app/js/actions/createLabOrder';
import toggleUrgency from '../../../app/js/actions/labOrders/toggleUrgency';

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
      dateFormatReducer: { dateFormat: '' },
      status: {
        fetched: true,
      },
      patient: {
        uuid: 'some-random-id',
      },
      dispatch: jest.fn(),
      session: {
        currentProvider: {
          person: {
            uuid: '1beeee',
          },
        },
      },
      encounterRole: {
        uuid: '1eeeee',
      },
      encounterType: {
        uuid: '1eeeee',
      },
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
      dateFormatReducer: { dateFormat: '' },
      openmrs: {
        session: {
          currentProvider: {
            person: {
              uuid: '1beeee',
            },
          },
        },
      },
      encounterRoleReducer: {
        encounterRole: {
          uuid: '1eeeee',
        },
      },
      encounterReducer: {
        encounterType: {
          uuid: '1eeeee',
        },
      },
    });
    const props = {
      location: { search: '?patient=esere_shbfidfb_343ffd' },
    };
    const wrapper = mount(<ConnectedOrdersTablePage store={store} {...props} />);
    expect(wrapper.find('.no-result-info').props().children).toEqual('No Orders');
  });
  it('handles editing of active orders', () => {
    const mockOrder = {
      date: '24/12/2018',
      display: 'Paracetamol',
      type: 'drugorder',
      dosingInstructions: '15mg of Amoxycillin syrup for the next 5 days',
      dispense: '25',
      activeDates: '25/08/2018 - 25/08/2019',
      orderer: { display: 'Mark Goodrich' },
      status: 'Active',
      uuid: 2,
    };

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
      status: {
        fetched: true,
      },
      patient: {
        uuid: 'some-random-id',
      },
      dispatch: jest.fn(),
      session: {
        currentProvider: {
          person: {
            uuid: '1beeee',
          },
        },
      },
      encounterRoleReducer: {
        encounterRole: {
          uuid: '1eeeee',
        },
      },
      encounterReducer: {
        encounterType: {
          uuid: '1eeeee',
        },
      },
    };

    const component = shallow(<OrdersTable {...props} />);
    const componentInstance = component.instance();
    componentInstance.handleActiveOrderEdit(mockOrder);
    expect(props.dispatch).toBeCalled();
  });
  describe('toggling urgency in the OrdersTable componenet', () => {
    const props = {
      filteredOrders: [
        {
          careSetting: { uuid: '1eee' },
          patient: { uuid: '1eeeee' },
          concept: { uuid: '1eeeehhh7' },
          type: 'testorder',
          encounter: { uuid: '2eeer' },
          urgency: 'STAT',
          orderer: { uuid: '1eer45', display: 'Mark' },
          uuid: '1eeeee',
        },
      ],
      status: {
        fetched: true,
      },
      patient: {
        uuid: 'some-random-id',
      },
      dispatch: jest.fn(),
      currentProvider: {
        person: {
          uuid: '1beeee',
        },
      },
      encounterRole: {
        uuid: '1eeeee',
      },
      encounterType: {
        uuid: '1eeeee',
      },
    };

    const wrapper = mount(<OrdersTable {...props} />);

    it(`dispatches the createLabOrder,toggleUrgency action creator
    and a successful toast message when the urgency icon is clicked
    and urgency-toggling is successfull`, () => {
      const urgencyIcon = wrapper.find('.icon-warning-sign');
      urgencyIcon.simulate('click');
      expect(props.dispatch.mock.calls[props.dispatch.mock.calls.length - 1][0].type)
        .toEqual('SAVE_DRAFT_LAB_ORDER');
      wrapper.setProps({
        ...wrapper.props(),
        createLabOrderReducer: {
          labOrderData: {
            orders: [
              {
                uuid: '1eee',
                urgency: 'STAT',
              },
            ],
          },
          status: {
            added: true,
          },
        },
      });
      expect(props.dispatch.mock.calls[props.dispatch.mock.calls.length - 1][0].type)
        .toEqual('TOGGLE_URGENCY');
      expect(global.toastrMessage).toEqual('urgency successfully changed')
    });

    it('shows a toast prompt if urgency-toggling is unsuccessful', () => {
      wrapper.setProps({
        ...wrapper.props,
        createLabOrderReducer: {
          ...wrapper.props().createLabOrderReducer,
          errorMessage: 'toggle failure',
          status: {
            error: true,
          },
        },
      });
      expect(global.toastrMessage).toEqual('toggle failure');
    });
  });
});
