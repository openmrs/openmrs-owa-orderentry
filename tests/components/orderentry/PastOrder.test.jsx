import React from 'react';
import PastOrder from '../../../app/js/components/orderEntry/PastOrder';

const { drug, auditInfo } = mockData;
const props = {
    drug,
    auditInfo,
}

describe('<PastOrder />', () => {
    it('should render component', () => {
        const wrapper = shallow(<PastOrder {...props}/>);
        expect(wrapper).toMatchSnapshot()
    });
  });
