import React from 'react';
import Paginate from '../../../app/js/components/orderEntry/Paginate';

const props = {
  totalPage: 193,
  nextPageUrl: 'http://next=page=some=random=page=and=the=length=20',
  dispatch: jest.fn(),
  prevPageUrl: 'http://prev=page=some=random=page=and=the=length=10',
  patientId: '123eeeeeer',
  fetchNew: jest.fn(),
}

const props2 = {
  totalPage: 5,
  nextPageUrl: 'http://next=page=some=random=page=and=the=length=20',
  dispatch: jest.fn(),
  prevPageUrl: '',
  patientId: '123eeeeeer',
  fetchNew: jest.fn(),
}

const wrapper2 = shallow(<Paginate {...props2} />)
const wrapper = shallow(<Paginate {...props} />)

describe('Pagination component test-suite', () => {
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render pagination component when no previousurl is passed', () => {
    expect(wrapper2).toMatchSnapshot();
  });

  it('dispatches action to fetch new data when the next button is clicked', () => {
    wrapper.find('.next').simulate('click');
    expect(props.fetchNew).toHaveBeenCalledWith(props.nextPageUrl, props.patientId);
  })

  it('dispatches action to fetch new data when the previous button is clicked', () => {
    wrapper.find('.prev').simulate('click');
    expect(props.fetchNew).toHaveBeenCalledWith(props.prevPageUrl, props.patientId);
  })
});
