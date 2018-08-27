import React from 'react';
import Tab from '../../../app/js/components/tabs/Tab';

describe('`Tab` component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<Tab/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should trigger event when clicked and isActive prop is false', () => {
        const event = { preventDefault: () => {} };
        jest.spyOn(event, 'preventDefault');
        const handleOnClick = jest.fn();
        const wrapper = shallow(<Tab onClick={handleOnClick}/>);
        const tab = wrapper.find('a');
        expect(handleOnClick.mock.calls.length).toBe(0);
        tab.simulate('click', event);
        expect(handleOnClick.mock.calls.length).toBe(1);
    });
    it('should trigger event when clicked and isActive prop is true', () => {
        const event = { preventDefault: () => {} };
        jest.spyOn(event, 'preventDefault');
        const props = {
            isActive: true,
            onClick: jest.fn(),
            tabName: 'random tab name',
            tabIndex: 2,
        }
        const wrapper = shallow(<Tab {...props} />);
        const tab = wrapper.find('a');
        tab.simulate('click', event);
        expect(props.onClick.mock.calls.length).toBe(1);
    });
});
