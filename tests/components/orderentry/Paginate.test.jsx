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

const wrapper = shallow(<Paginate {...props} />)

describe('Pagination component test-suite', () => {
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('dispatches action to fetch new data when the next button is clicked', () => {
    wrapper.find('.next').simulate('click');
    expect(props.fetchNew).toHaveBeenCalledWith(props.nextPageUrl);
  })

  it('dispatches action to fetch new data when the previous button is clicked', () => {
    wrapper.find('.prev').simulate('click');
    expect(props.fetchNew).toHaveBeenCalledWith(props.prevPageUrl);
  })

  it('Disable the button when no url is passed', () => {
    wrapper.setProps({
      ...wrapper.props,
      prevPageUrl: '',
      nextPageUrl: '',
    })
    expect(wrapper.find('.page-link-disabled')).toHaveLength(2);
  });

  
});
