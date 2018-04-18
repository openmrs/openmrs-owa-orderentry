import React from 'react';
import DosageTab from '../../../app/js/components/tabs/DosageTab'

describe('Dosage Tab component', () => {
    const props = {
      dosingDetails:{
        tabName:'Standard'
      }
    }
    it('should render without crashing', () => {
        const wrapper = shallow(<DosageTab {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
    it('should display the standard dosage form', ()=>{
      const wrapper = shallow(<DosageTab {...props}/>);
      expect(wrapper.find('#Standard')).toHaveLength(1);
    })
    it('should display the free text dosage form', ()=>{
      const props = {
        dosingDetails:{
          tabName:'FreeText'
        }
      }
      const wrapper = shallow(<DosageTab {...props}/>);
      expect(wrapper.find('#FreeText')).toHaveLength(1);
    })     
});
