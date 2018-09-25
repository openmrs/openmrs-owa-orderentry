import React from 'react';

import StandardDose from '../../../../app/js/components/drugOrderEntry/addForm/StandardDose';

const props = {
  fields: {},
  fieldErrors: {},
  careSetting: { display: 'Outpatient' },
  options: {
    dosingUnit: [
      {
        display: 'milligrams',
        uuid: 'ABC-56Y',
      },
    ],
    frequency: [
      {
        display: 'once',
        uuid: 'ABC-56Y',
      },
    ],
    route: [
      {
        display: 'oral',
        uuid: 'ABC-56Y',
      },
    ],
    durationUnit: [
      {
        display: 'weeks',
        uuid: 'ABC-56Y',
      },
    ],
  },
  handleChange: jest.fn(),
  handleValidation: jest.fn(),
  activateSaveButton: jest.fn(),
  handleSubmit: jest.fn(),
  handleCancel: jest.fn(),
};

const errorProps = {
  ...props,
  fieldErrors: { dose: true },
};

describe('Test for Standard dose form', () => {
  let wrapper;
  describe('Rendering with initial props', () => {
    beforeEach(() => {
      wrapper = shallow(<StandardDose {...props} />);
    });

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

    it('should render options if they exist in state', () => {
      expect(wrapper.find('option')).toHaveLength(4);
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
