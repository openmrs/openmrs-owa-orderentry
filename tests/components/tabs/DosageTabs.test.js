import React from 'react';
import DosageTabs from '../../../app/js/components/tabs/DosageTabs'

describe('Dosage Tab component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<DosageTabs/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('should display the tab links', ()=>{
      const wrapper = shallow(<DosageTabs/>);
      wrapper.setState({ dosingDetails: { tabName: 'Standard', dosingType: 'org.openmrs.SimpleDosingInstructions' }});
      expect(wrapper.find('a')).toHaveLength(2);
    })     
});
