import React from 'react';
import {PastOrders} from '../../../app/js/components/orderEntry/PastOrders';

const props={
  getPastOrders:()=>{},
  location:{
    hash:{
      replace:()=>{}
    }
  },
  pastOrders:{
    loading:false,
    pastOrders:[{
      uuid:'024b1459-f31d-46cb-8ad3-2a624c894e2c',
      dose:1,
      quantity:2,
      duration:2,
      auditInfo:{dateCreated:'2018-03-20 10:59:22'},
      drug:{display:'new drug'},
      doseUnits:{display:'drops'},
      frequency:{display:'twice a week'},
      route:{display:'reactally'},
      quantityUnits:{display:'drops'},
      durationUnits:{display:'weeks'},
    }]
  },
  careSetting:{
    uuid:{}
  }
}
describe('Test for Past orders', () => {
  it('should render component', () => {
    const wrapper = mount(<PastOrders {...props}/>  );
    expect(wrapper).toMatchSnapshot()
  });
  it('should render a table with past orders', () => {
    const wrapper = mount(<PastOrders {...props}/>  );
    expect(wrapper.find('table')).toHaveLength(1);
  });
});
