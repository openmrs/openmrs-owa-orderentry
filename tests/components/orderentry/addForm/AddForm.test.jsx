import React from 'react';

import { AddForm } from '../../../../app/js/components/orderEntry/addForm/AddForm';

const props = {
  selectDrugSuccess: jest.fn(),
  getOrderEntryConfigurations: jest.fn(),
  allConfigurations: {
    drugDosingUnits: [{display: 'grams'}],
    orderFrequencies: [{display: 'daily'}],
    drugRoutes: [{display: 'eye drops'}],
    drugDispensingUnits: [{display: 'kits'}],
    durationUnits:  [{display: 'months'}],
  },
  careSetting: {display: 'Inpatient'},
  drugName: 'Paracentamol',
  drugUuid: 'AJJJKW7378JHJ',
};

const outpatientprops = {
  ...props,
  careSetting: {display: 'Outpatient'},
}

describe('Test for adding a new drug order', () => {
    it('should render component', () => {
      const wrapper = shallow(<AddForm {...props} />  );
      expect(wrapper).toMatchSnapshot()
    });
    describe('inpatient orders', () =>{
      const wrapper = mount(<AddForm {...props} />  );
      it('Confirm button is originally disabled', () => {
        expect(wrapper.find('button.confirm').props().disabled).toBe(true);
      });
      it('should not have any errors messages initially', () => {
        expect(wrapper.find('span.field-error').length).toBe(0);
      });
      describe('Activate and deactivate Confirm button', () => {
        beforeEach(() => {
          wrapper.find('[name="dose"]').simulate('change', {target: {name: 'dose', value: 8}});
          wrapper.find('[name="dosingUnit"]').simulate('change', {target: {name: 'dosingUnit', value: 'kilogram'}});
          wrapper.find('[name="route"]').simulate('change', {target: {name: 'route', value: 'oral'}});
          wrapper.find('[name="frequency"]').simulate('change', {target: {name: 'frequency', value: 'once'}});
        });
        it('should activate when the required fields are filled', () => {
          expect(wrapper.find('button.confirm').props().disabled).toBe(false);
        });
        it('should deactivate with duration without units', () => {
          wrapper.find('[name="duration"]').simulate('change', {target: {name: 'duration', value: 7}});
          expect(wrapper.find('button.confirm').props().disabled).toBe(true);
        });
        it('should activate with both duration and units', () => {
          wrapper.find('[name="duration"]').simulate('change', {target: {name: 'duration', value: 7}});
          wrapper.find('[name="durationUnit"]').simulate('change', {target: {name: 'durationUnit', value: 'weeks'}});
          expect(wrapper.find('button.confirm').props().disabled).toBe(false);
        });
        it('should deactivate with both duration and invalid units', () => {
          wrapper.find('[name="duration"]').simulate('change', {target: {name: 'duration', value: 7}});
          wrapper.find('[name="durationUnit"]').simulate('change', {target: {name: 'durationUnit', value: 'weeks'}});
          wrapper.find('[name="durationUnit"]').simulate('blur');
          expect(wrapper.find('button.confirm').props().disabled).toBe(true);
        });
      });
    });  
   describe('Outpatient orders', () => {
      const wrapper = mount(<AddForm {...outpatientprops} />);
      beforeEach(() => {
        wrapper.find('[name="dose"]').simulate('change', {target: {name: 'dose', value: 8}});
        wrapper.find('[name="dosingUnit"]').simulate('change', {target: {name: 'dosingUnit', value: 'kilogram'}});
        wrapper.find('[name="route"]').simulate('change', {target: {name: 'route', value: 'oral'}});
        wrapper.find('[name="frequency"]').simulate('change', {target: {name: 'frequency', value: 'once'}});
      });
      it('should be deactivated without both dispensing quantity and units', () => {
        expect(wrapper.find('button.confirm').props().disabled).toBe(true);
      });
      it('should be deactivated with dispensing quantity without units', () => {
        wrapper.find('[name="dispensingQuantity"]').simulate('change', {target: {name: 'dispensingQuantity', value: 12}});
        expect(wrapper.find('button.confirm').props().disabled).toBe(true);
      });
      it('should be activated with both dispensing Quantity and units', () => {
        wrapper.find('[name="dispensingQuantity"]').simulate('change', {target: {name: 'dispensingQuantity', value: 12}});
        wrapper.find('[name="dispensingUnit"]').simulate('change', {target: {name: 'dispensingUnit', value: 'kits'}});
        expect(wrapper.find('button.confirm').props().disabled).toBe(false);
      });
      describe('Validation of fields', () => {
        beforeEach(() => {
          wrapper.find('[name="dispensingQuantity"]').simulate('change', {target: {name: 'dispensingQuantity', value: 12}});
          wrapper.find('[name="dispensingUnit"]').simulate('change', {target: {name: 'dispensingUnit', value: 'tins'}});
        });
        it ('should deactivate confirm button with invalid dose units', () => {
          wrapper.find('[name="dosingUnit"]').simulate('blur')
          expect(wrapper.find('button.confirm').props().disabled).toBe(true);
        });
        it ('should display error with invalid dosing units', () => {
          wrapper.find('[name="dosingUnit"]').simulate('blur')
          expect(wrapper.find("span.field-error").length).toBe(1);
        });
        it ('should activate with valid dose units', () => {
          wrapper.find('[name="dosingUnit"]').simulate('change', {target: {name: 'dosingUnit', value: 'grams'}});
          wrapper.find('[name="dosingUnit"]').simulate('blur');
          expect(wrapper.find('button.confirm').props().disabled).toBe(false);
        });
        it ('should deactivate with invalid frequency', () => {
          wrapper.find('[name="frequency"]').simulate('blur');
          expect(wrapper.find('button.confirm').props().disabled).toBe(true);
        });
        it ('should deactivate with invalid route', () => {
          wrapper.find('[name="route"]').simulate('blur');
          expect(wrapper.find('button.confirm').props().disabled).toBe(true);
        });
        it ('should deactivate with invalid dispensing unit', () => {
          wrapper.find('[name="dispensingUnit"]').simulate('blur');
          expect(wrapper.find('button.confirm').props().disabled).toBe(true);
        });
    });
  });
});
