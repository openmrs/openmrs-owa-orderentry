import React from 'react';
import { PastOrders } from '../../../app/js/components/orderEntry/PastOrders';

const { data } = mockData;

const props={
  getPastOrders:()=>{},
  location:{
    hash:{
      replace:()=>{}
    }
  },
  dateFormat: 'DD-MMM-YYYY HH:mm',
  pastOrders:{
    loading:false,
    pastOrders:[{
      uuid:'024b1459-f31d-46cb-8ad3-2a624c894e2c',
      dose:1,
      quantity:2,
      duration:2,
      dateActivated:'2018-May-20 10:59',
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
  },
  data,
}


let mountedComponent;
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<PastOrders {...props} />);
  }
  return mountedComponent;
};

describe('Test for Past orders', () => {
  it('should render component', () => {
    expect(getComponent()).toMatchSnapshot();
  });
  it('should render a table with past orders', () => {
    expect(getComponent().find('table')).toHaveLength(1);
  });
});

describe('onPageChange() method', () => {
  it('should call onPageChange()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'onPageChange');
    renderedComponent.onPageChange(data);
    expect(renderedComponent.onPageChange.calledOnce).toEqual(true);
  });
});

describe('componentWillReceiveProps()', () => {
  it('should update state', () => {
    const renderedComponent = getComponent().instance();
    getComponent().setProps({ tabName: 'inpatient' })
    getComponent().setProps({ pageCount: 2 })
    getComponent().setState({ pageCount: 9 })
    expect(getComponent().state().pageCount).toEqual(9);
  });
});

describe('behaviour when there is no past orders and page is loading', () => {
  it('should display <img src={imageLoader} alt="loader" />', () => {
    const props={
      getPastOrders:()=>{},
      location:{
        hash:{
          replace:()=>{}
        }
      },
      pastOrders:{
        loading:true,
        pastOrders:[]
      },
      careSetting:{
        uuid:{}
      },
      data,
    }
    const wrapper = shallow(<PastOrders {...props} />);
    expect(wrapper.find('img').length).toEqual(1);
  });
});
