import React from 'react';
import { mountWithIntl, shallowWithIntl } from '@openmrs/react-components';
import { AddForm } from '../../../../app/js/components/drugOrderEntry/addForm/AddForm';

const {
  draftOrders, draftOrder, editOrder, formType, session,
} = mockData;

const props = {
  addDraftOrderAction: jest.fn(),
  createOrderReducer: jest.fn(),
  clearDrugForms: jest.fn(),
  clearSearchField: jest.fn(),
  setOrder: jest.fn(),
  setSelectedOrder: jest.fn(),
  removeOrder: jest.fn(),
  selectDrugSuccessAction: jest.fn(),
  setSelectedOrderAction: jest.fn(),
  getOrderEntryConfigurationsAction: jest.fn(),
  fetchAllOrdersAction: jest.fn(),
  activity: '',
  allConfigurations: {
    drugDosingUnits: [{ display: 'grams' }],
    orderFrequencies: [{ display: 'daily' }],
    drugRoutes: [{ display: 'eye drops' }],
    drugDispensingUnits: [{ display: 'kits' }],
    durationUnits: [{ display: 'months' }],
  },
  createOrderReducer: {
    addedOrder: {},
    errorMessage: '',
    status: {
      error: false,
      added: false,
    },
  },
  careSetting: { bdisplay: 'Outpatient', uuid: 'aaa1234' },
  drugName: 'Paracetamol',
  drugUuid: 'AJJJKW7378JHJ',
  draftOrder,
  draftOrders,
  editOrder,
  formType,
  session,
  patient: {
    patientId: 'some-random-id',
    uuid: 'some-random-id',
    patientIdentiier: { uuid: 'some-random-uuid' },
    person: { gender: 'M', age: 12, birthdate: '2006-08-08T00:00:00.000+0100' },
    personName: { display: 'joey bart' },
  },
  fetchOrdersReducer: {
    filteredOrders: [
      {
        activeDates: '24/12/2018',
        display: 'Paracetamol',
        type: 'drugorder',
        dosingInstructions: '25mg of Amoxycillin syrup for the next 5 days',
        dispense: '45',
        orderer: { display: 'Mark Goodrich' },
        drug: {
          uuid: "502a2b2e-4659-4987-abbd-c50545dead47",
          display: "Paracetamol",
        },
        urgency: 'STAT',
        uuid: 2,
      },
    ]
  },
};

let mountedComponent;
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallowWithIntl(<AddForm {...props} />);
  }
  return mountedComponent;
};

describe('Test for adding a new drug order', () => {
  it('should render component', () => {
    const wrapper = shallowWithIntl(<AddForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Outpatient orders', () => {
    const wrapper = mountWithIntl(<AddForm {...props} />);
    describe('Activate and deactivate Confirm button under standard dosing form', () => {
      beforeEach(() => {
        wrapper.find('[name="dose"]').simulate('change', { target: { name: 'dose', value: 8 } });
        wrapper
          .find('[name="dosingUnit"]')
          .simulate('change', { target: { name: 'dosingUnit', value: 'kilogram' } });
        wrapper
          .find('[name="route"]')
          .simulate('change', { target: { name: 'route', value: 'oral' } });
        wrapper
          .find('[name="frequency"]')
          .simulate('change', { target: { name: 'frequency', value: 'once' } });
        wrapper
          .find('[name="durationUnit"]')
          .simulate('change', { target: { name: 'durationUnit', value: 'weeks' } });
      });
      it('should be deactivated without both dispensing quantity and units', () => {
        expect(wrapper.find('button.confirm').props().disabled).toBe(true);
      });

      it('should be deactivated with dispensing quantity without units', () => {
        wrapper
          .find('[name="dispensingQuantity"]')
          .simulate('change', { target: { name: 'dispensingQuantity', value: 12 } });
        expect(wrapper.find('button.confirm').props().disabled).toBe(true);
      });

      it('should be activated with both dispensing Quantity and units', () => {
        wrapper
          .find('[name="dispensingQuantity"]')
          .simulate('change', { target: { name: 'dispensingQuantity', value: 12 } });
        wrapper
          .find('[name="dispensingUnit"]')
          .simulate('change', { target: { name: 'dispensingUnit', value: 'kits' } });
        expect(wrapper.find('button.confirm').props().disabled).toBe(false);
      });
    });

    describe('Activate and deactivate Confirm button under free text form', () => {
      it('should activate when the required fields are filled', () => {
        wrapper.setState({ formType: 'Free Text' });
        expect(wrapper.state().formType).toEqual('Free Text');
        wrapper
          .find('[name="drugInstructions"]')
          .simulate('change', { target: { name: 'drugInstructions', value: '3 tablets' } });
        wrapper
          .find('[name="dispensingQuantity"]')
          .simulate('change', { target: { name: 'dispensingQuantity', value: 12 } });
        wrapper
          .find('[name="dispensingUnit"]')
          .simulate('change', { target: { name: 'dispensingUnit', value: 'kits' } });
        expect(wrapper.find('button.confirm').props().disabled).toBe(false);
      });
    });

    describe('Validation of fields', () => {
      beforeEach(() => {
        wrapper
          .find('[name="dispensingQuantity"]')
          .simulate('change', { target: { name: 'dispensingQuantity', value: 12 } });
        wrapper
          .find('[name="dispensingUnit"]')
          .simulate('change', { target: { name: 'dispensingUnit', value: 'tins' } });
      });

      it('should deactivate confirm button with invalid dose units', () => {
        wrapper.find('[name="dosingUnit"]').simulate('blur');
        expect(wrapper.find('button.confirm').props().disabled).toBe(true);
      });

      it('should display error with invalid dosing units', () => {
        wrapper.find('[name="dosingUnit"]').simulate('blur');
        expect(wrapper.find('span.field-error').length).toBe(1);
      });

      it('should activate with valid dose units', () => {
        wrapper
          .find('[name="dosingUnit"]')
          .simulate('change', { target: { name: 'dosingUnit', value: 'grams' } });
        wrapper.find('[name="dosingUnit"]').simulate('blur');
        expect(wrapper.find('button.confirm').props().disabled).toBe(false);
      });

      it('should deactivate with invalid frequency', () => {
        wrapper.find('[name="frequency"]').simulate('blur');
        expect(wrapper.find('button.confirm').props().disabled).toBe(true);
      });

      it('should deactivate with invalid route', () => {
        wrapper.find('[name="route"]').simulate('blur');
        expect(wrapper.find('button.confirm').props().disabled).toBe(true);
      });

      it('should deactivate with invalid dispensing unit', () => {
        wrapper.find('[name="dispensingUnit"]').simulate('blur');
        expect(wrapper.find('button.confirm').props().disabled).toBe(true);
      });

      it('should deactivate if duration is valid but duration unit is invalid', () => {
        wrapper
          .find('[name="duration"]')
          .simulate('change', { target: { name: 'duration', value: '1' } });
        wrapper.find('[name="durationUnit"]').simulate('blur');
        expect(wrapper.find('button.confirm').props().disabled).toBe(true);
      });
    });
  });
});

describe('Test AddForm state', () => {
  it('should update state', () => {
    mountedComponent = mountWithIntl(<AddForm {...props} />);
    getComponent().setState({ fields: { dose: 11 } });
    getComponent()
      .find('[name="dose"]')
      .simulate('change', { target: { name: 'dose', value: 9 } });
    getComponent()
      .find('.confirm')
      .simulate('click');
    expect(getComponent().state().fields.dose).toEqual(9);
  });
});

describe('handleFormType() method', () => {
  it('sets state when method is triggered', () => {
    const componentMethods = getComponent().instance();
    componentMethods.handleFormType(formType);
    expect(getComponent().state('formType')).toEqual('Free Text');
  });
});

describe('handleFormTabs() method', () => {
  it('sets state when method is triggered', () => {
    const componentMethods = getComponent().instance();
    componentMethods.handleFormTabs(1);
    expect(getComponent().state('activeTabIndex')).toEqual(1);
  });
});

describe('handleCancel() method', () => {
  it('dispatches clearSearchField prop when fired', () => {
    const componentMethods = getComponent().instance();
    componentMethods.handleCancel();
    expect(props.clearSearchField).toBeCalled();
  });
});

describe('populateEditOrderForm() method', () => {
  it('sests state to data in editOrder and draftOrder props', () => {
    const componentMethods = getComponent().instance();
    componentMethods.populateEditOrderForm();
    expect(getComponent().state('activeTabIndex')).toEqual(1);
    expect(getComponent().state('fields')).toEqual({
      dispensingQuantity: '',
      dispensingUnit: '',
      dose: '',
      dosingUnit: '',
      drugInstructions: '',
      duration: '',
      durationUnit: '',
      frequency: '',
      reason: '',
      route: '',
    });
  });
});

describe('clearDrugForms() method', () => {
  it('resets the data in state', () => {
    const componentMethods = getComponent().instance();
    componentMethods.clearDrugForms();
    expect(getComponent().state('fields')).toEqual({
      dispensingQuantity: '',
      dispensingUnit: '',
      dose: '',
      dosingUnit: '',
      drugInstructions: '',
      duration: '',
      durationUnit: '',
      frequency: '',
      reason: '',
      route: '',
    });
  });
});

describe('handleSubmitDrugForm() method', () => {
  const { 
    addDraftOrderAction,
    setOrder, 
    selectDrugSuccessAction,
    setSelectedOrderAction,
    } = props;
  it(`it dispatches the addDraftOrder, selectDrugSuccess,
  setOrderAction props when method is fired`, () => {
    const renderedComponent = getComponent().instance();
    renderedComponent.handleSubmitDrugForm();
    expect(addDraftOrderAction).toBeCalled();
    expect(setOrder).toBeCalled();
    expect(selectDrugSuccessAction).toBeCalled();
  });

  it('dispatches setSelectedOrder if activity is DRAFT_ORDER_EDIT', () => {
    const component = getComponent();
    const componentMethods = component.instance();
    component.setProps({ activity: 'DRAFT_ORDER_EDIT' });
    componentMethods.handleSubmitDrugForm();
    expect(setSelectedOrderAction).toHaveBeenCalled();
  });

  it('sets state accordingly', () => {
    const component = getComponent().instance();
    component.setState({ action: 'NOT_NEW' });
    component.handleSubmitDrugForm();
    expect(component.state.draftOrder).toEqual({
      ...component.state.draftOrder,
      action: 'NOT_NEW',
    });
  });

  it('displays a toast with message if a drug has an active order', () => {
    expect(global.toastrMessage === 'Paracetamol order is active.').toBeFalsy();
    const component = getComponent();
    const componentMethods = component.instance();
    component.setProps({ drugUuid: '502a2b2e-4659-4987-abbd-c50545dead47' });
    componentMethods.handleSubmitDrugForm();
    expect(global.toastrMessage).toEqual('Paracetamol order is active.');
  });

  it('displays a toast with message if a drug has been added successfully', () => {
    expect(global.toastrMessage === 'Order Successfully Created').toBeFalsy();
    const wrapper = getComponent();
    wrapper.setProps({
      ...wrapper.props(),
      createOrderReducer: {
        errorMessage: '',
        addedOrder: { id: 1, type: 'testorder' },
        status: {
          added: true,
          error: false,
        },
      },
    });
    expect(global.toastrMessage).toEqual('Order Successfully Created');
  });

  it('displays a toast with message if a an error occured in adding drug', () => {
    const wrapper = getComponent();
    wrapper.setProps({
      ...wrapper.props(),
      createOrderReducer: {
        errorMessage: ['Order.cannot.have.more.than.one'],
        addedOrder: {},
        status: {
          added: false,
          error: true,
        },
      },
    });
    expect(global.toastrMessage).toEqual('Cannot have more than one active order for the same orderable and care setting at same time');
  });

  it('should change the selected order after a drug has been added', () => {
    const component = getComponent();
    props.setSelectedOrderAction.mockReset();
    component.setProps({
      createOrderReducer: {
        addedOrder: { order: 'just-a-sample-order' },
        status: { added: true, errror: false },
      },
    });
    expect(setSelectedOrderAction).toHaveBeenCalledTimes(1);
  });
});
