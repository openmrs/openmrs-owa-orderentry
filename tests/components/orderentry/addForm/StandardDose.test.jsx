import React from 'react';

import StandardDose from '../../../../app/js/components/orderEntry/addForm/StandardDose';

const inpatientProps = {
  fields: {},
  fieldErrors: {},
  careSetting: {display: 'Inpatient'},
  allConfigurations: {},
  handleChange: jest.fn(),
  handleValidation: jest.fn(),
  activateStandardSaveButton: jest.fn(),
  handleSubmit: jest.fn(),
  handleCancel: jest.fn(),
}

const outpatientProps = {
  ...inpatientProps, 
  careSetting: { display: 'Outpatient'},
}

const errorProps = {
  ...inpatientProps,
  fieldErrors: {dose: true},
}

describe('Test for Standard dose form', () => {
  let wrapper;
  describe('Rendering with initial props', () => {
    beforeEach(() => {
      wrapper = shallow(<StandardDose {...inpatientProps} />);
    })
    it('should render component', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should contain form', () => {
      expect(wrapper.find('form').length).toBe(1);
    });
    it('form should contain a save button', () => {
      expect(wrapper.find('button.confirm').length).toBe(1);
    });
    it('form should contain a cancel button', () => {
      expect(wrapper.find('button.cancel').length).toBe(1);
    });
    it('inpatient caresetting should not render dispense fields but outpatient should', () => {
      const outpatientWrapper = shallow(<StandardDose {...outpatientProps} />);
      expect(wrapper.find('input').length).toBeLessThan(outpatientWrapper.find('input').length);
    });
    it('should not have any field errors initially', () => {
      expect(wrapper.find('input.illegalValue').length).toBe(0);
    });
  });
  it('should render field errors if they exist', () => {
      const errorWrapper = shallow(<StandardDose {...errorProps} />);
      expect(errorWrapper.find('input.illegalValue').length).toBeGreaterThan(0);
  });
});
