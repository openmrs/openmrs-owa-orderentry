import React from 'react';
import DosageTab from '../../../app/js/components/tabs/DosageTab'
import StandardDose from '../../../app/js/components/drugOrderEntry/addForm/StandardDose'
import FreeText from '../../../app/js/components/drugOrderEntry/addForm/FreeText'

describe('Dosage Tab component', () => {
    const props = {
      activeTabIndex:0
    }
    const dosageTabProps = {
      icon: '',
      tabName: '',
      onClick: jest.fn(),
      tabIndex: 1,
    };
    const standardDoseProps = {
      fields: {},
      fieldErrors: {},
      careSetting: {},
      options: {},
      handleChange: jest.fn(),
      handleValidation: jest.fn(),
      activateSaveButton: jest.fn(),
      handleSubmit: jest.fn(),
      handleCancel: jest.fn(),
    };
    const freeTextProps = {
      fieldErrors: {},
      handleValidation: jest.fn(),
      activateSaveButton: jest.fn(),
      fields: {},
      options: {},
      handleCancel: jest.fn(),
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      careSetting: {
        display: '',
      },
    };
    it('should render without crashing', () => {
        const wrapper = shallow(<DosageTab {...dosageTabProps}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('should render the standard form', () => {
      const wrapper = shallow(<DosageTab {...dosageTabProps}><StandardDose {...standardDoseProps}/></DosageTab>);
      expect(wrapper).toMatchSnapshot();
    });
    it('should render the free text form', () => {
      const wrapper = shallow(<DosageTab {...dosageTabProps}><FreeText {...freeTextProps}/></DosageTab>);
      expect(wrapper).toMatchSnapshot();
  });
});

describe('Test click events', () => {
  const props = {
    icon: '',
    tabName: '',
    onClick: jest.fn(),
    tabIndex: 1,
  };
  it('should trigger event when clicked', () => {
    const wrapper = shallow(<DosageTab {...props}/>);
    expect(props.onClick.mock.calls.length).toBe(0);
    wrapper.find('a').simulate('click', {
        preventDefault: () => {},
      });
    expect(props.onClick.mock.calls.length).toBe(1);
  });
});
