import React from 'react';
import DosageTabs from '../../../app/js/components/tabs/DosageTabs'

describe('Dosage Tab component', () => {
    const props={
        children:[]
    }
    it('should render without crashing', () => {
        const wrapper = shallow(<DosageTabs {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
});
