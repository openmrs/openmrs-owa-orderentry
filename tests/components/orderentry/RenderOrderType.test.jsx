import React from 'react';
import RenderOrderType from '../../../app/js/components/orderEntry/RenderOrderType';
import * as orderTypes from '../../../app/js/components/orderEntry/orderTypes';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<RenderOrderType {...props} />);
  }
  return mountedComponent;
};

describe('Component: orderentry: RenderOrderType', () => {
  beforeEach(() => {
    props = { 
      currentOrderTypeID: null,
      outpatientCareSetting: { uuid: '5677666' },
      inpatientCareSetting: { uuid: '6766667' },
      location: {search: '?patient=esere_shbfidfb_343ffd'}
    };
    mountedComponent = undefined;
  });
  describe('Conditional rendering', () => {
    it('shows the drug order entry by default', () => {
      const component = getComponent();
      expect(component).toMatchSnapshot();
    });
    it('shows the durg order entry when specified', () => {
      props.currentOrderTypeID = orderTypes.DRUG_ORDER.id;
      const component = getComponent();
      expect(component).toMatchSnapshot();
    });
    it('shows the lab order entry when specified', () => {
      props.currentOrderTypeID = orderTypes.LAB_ORDER.id;
      const component = getComponent();
      expect(component).toMatchSnapshot();
    });
    it('shows the order from set entry when specified', () => {
      props.currentOrderTypeID = orderTypes.ORDER_FROM_SETS.id;
      const component = getComponent();
      expect(component).toMatchSnapshot();
    });
  });
});
