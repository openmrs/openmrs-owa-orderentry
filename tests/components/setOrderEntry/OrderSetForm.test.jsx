import React from 'react';
import { OrderSetForm } from '../../../app/js/components/setsOrderEntry/OrderSetForm';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<OrderSetForm {...props} />);
  }
  return mountedComponent;
};

describe('Component: OrderSetForm', () => {
  beforeEach(() => {
    props = {
      fetchOrderSet: jest.fn(),
      addDraftOrder: jest.fn(),
      orderSets: [{
          dependency: "https://github.com/PIH/openmrs-module-mirebalais",
          name: "CHOP",
          category: "CIEL:163073",
          id: 1,
          cycleCount: 6,
          cycleLength: 3,
          cycleLengthUnits: "Weeks",
          orders: [
            {
              drugName: "Strepsils",
              action: "NEW",
              dose: "",
              dosingUnit: "",
              frequency: "",
              route: "",
              duration: "",
              durationUnit: "",
              dispensingUnit: "Pint",
              dispensingQuantity: "3",
              reason: "",
              previousOrder: null,
              drugInstructions: "One tablet 3 Times daily",
              careSetting: "6f0c9a92-6f24-11e3-af88-005056821db0",
              drug: "d656c4c5-6915-4bda-9023-e75cf80d4121",
              orderer: "f9badd80-ab76-11e2-9e96-0800200c9a66",
              dosingType: "org.openmrs.FreeTextDosingInstructions",
              type: "drugorder",
            },
            {
              drugName: "SODIUM CHLORIDE",
              action: "NEW",
              dose: "",
              dosingUnit: "",
              frequency: "",
              route: "",
              duration: "",
              durationUnit: "",
              dispensingUnit: "Packets",
              dispensingQuantity: "2",
              reason: "",
              previousOrder: null,
              drugInstructions: "Sodium",
              careSetting: "6f0c9a92-6f24-11e3-af88-005056821db0",
              drug: "9ec1b820-2e30-4bb1-9d18-2703e4c5f932",
              orderer: "f9badd80-ab76-11e2-9e96-0800200c9a66",
              dosingType: "org.openmrs.FreeTextDosingInstructions",
              type: "drugorder",
            },
            {
              drugName: "Procold",
              action: "NEW",
              dose: "",
              dosingUnit: "",
              frequency: "",
              route: "",
              duration: "",
              durationUnit: "",
              dispensingUnit: "Pint",
              dispensingQuantity: "10",
              reason: "",
              previousOrder: null,
              drugInstructions: "2 thrice daily",
              careSetting: "6f0c9a92-6f24-11e3-af88-005056821db0",
              drug: "502a2b2e-4659-4987-abbd-c50545dead47",
              orderer: "f9badd80-ab76-11e2-9e96-0800200c9a66",
              dosingType: "org.openmrs.FreeTextDosingInstructions",
              type: "drugorder",
            },
          ],
      }]
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('should hide the selectBox when changeSelectedOrderSet is called', () => {
    const renderedComponent = getComponent().instance();
    const { changeSelectedOrderSet } = renderedComponent;
    changeSelectedOrderSet({ name: 'Panadol', id: 0 });
    expect(renderedComponent.state.displaySets).toEqual(false);
  });

  it('should fetch an orderSet from a list of ordersets', () => {
    const renderedComponent = getComponent().instance();
    const { fetchSelectedOrderSet } = renderedComponent;
    const foundOrderSet = fetchSelectedOrderSet(1);
    expect(foundOrderSet.name).toEqual('CHOP');
  });

  it('should generate a formatted list of options for ordersets', () => {
    const renderedComponent = getComponent().instance();
    const { generateOrderSetOptions } = renderedComponent;
    const expectedOptions = [{ name: 'CHOP', id: 1 }];
    const generatedOptions = generateOrderSetOptions();
    expect(generatedOptions).toEqual(expectedOptions);
  });

  it('should generate an option for ordersets showing loading if ordersets have not been loaded', () => {
    const component = getComponent();
    const renderedComponent = component.instance();
    component.setProps({ orderSets: [] });
    const { generateOrderSetOptions } = renderedComponent;
    const expectedOptions = [{ name: 'Loading', id: 0 }];
    const generatedOptions = generateOrderSetOptions();
    expect(generatedOptions).toEqual(expectedOptions);
  });

  it('should hide the segment of the form that displays the order details when cancelOrderSet is called', () => {
    const renderedComponent = getComponent().instance();
    const { cancelOrderSet } = renderedComponent;
    cancelOrderSet();
    expect(renderedComponent.state.displayForm).toEqual(false);
  });
});

describe('handleSubmit() method', () => {
  it('should call handleSubmit()', () => {
    const renderedComponent = getComponent().instance();
    getComponent().setState({ selectedItem: { name: 'CHOP', id: 1 } });
    renderedComponent.handleSubmit();
    expect(getComponent().state().selectedItem.name).toEqual('');
  });
});

