import React from 'react';
import DosageTab from '../../../app/js/components/tabs/DosageTab'
import StandardDose from '../../../app/js/components/orderEntry/addForm/StandardDose'
import FreeText from '../../../app/js/components/orderEntry/addForm/FreeText'

describe('Dosage Tab component', () => {
    const props = {
      activeTabIndex:0
    }
    it('should render without crashing', () => {
        const wrapper = shallow(<DosageTab {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('should render the standard form', () => {
      const wrapper = shallow(<DosageTab {...props}><StandardDose/></DosageTab>);
      expect(wrapper).toMatchSnapshot();
    });
    it('should render the free text form', () => {
      const wrapper = shallow(<DosageTab {...props}><FreeText/></DosageTab>);
      expect(wrapper).toMatchSnapshot();
  });
});

describe('Test click events', () => {
  it('should trigger event when clicked', () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(<DosageTab onClick={mockCallBack}/>);
    expect(mockCallBack.mock.calls.length).toBe(0);
    wrapper.find('a').simulate('click', {
        preventDefault: () => {},
      });
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
