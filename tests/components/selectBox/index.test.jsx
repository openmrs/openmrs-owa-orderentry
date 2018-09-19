import React from 'react';
import SelectBox from '../../../app/js/components/selectBox';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<SelectBox {...props} />);
  }
  return mountedComponent;
};

describe('Component: SelectBox', () => {
  beforeEach(() => {
    props = {
      name: 'sets',
      items: [{ value: 'Choose a set to add', id: 0 }, { value: 'Mineral', id: 1 }],
      selectedItem: {},
      onChange: jest.fn(),
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('should change the value of showItems in the state when dropDown() is called', () => {
    const component = getComponent();
    const renderedComponent = getComponent().instance();
    const showItems = renderedComponent.state.showItems;
    component
     .find('.select-box--arrow')
     .simulate('click', {});
   expect(renderedComponent.state.showItems !== showItems);
  });

  it('should set the value of selected item in state when selectItem() is called', () => {
    const renderedComponent = getComponent().instance();
    const { selectItem } = renderedComponent;
    selectItem({ value: 'Choose a set to add', id: 0 });
    expect(renderedComponent.state.selectedItem).toEqual({ value: 'Choose a set to add', id: 0 });
  });

  it('should call selectItem and set value of selectedItem in the state when the item div is clicked', () => {
    const renderedComponent = getComponent();
    const instanceOfRenderedComponent = renderedComponent.instance()
    renderedComponent.find('#item0').simulate('click');
    expect(instanceOfRenderedComponent.state.selectedItem).toEqual({ value: 'Choose a set to add', id: 0 });
  });
});
