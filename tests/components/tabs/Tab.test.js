import React from 'react';
import Tab from '../../../app/js/components/tabs/Tab';

describe('`Tab` component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<Tab/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should trigger event when clicked', () => {
        const handleOnClick = jest.fn();
        const wrapper = shallow(<Tab onClick={handleOnClick}/>);
        const tab = wrapper.find('a');
        expect(handleOnClick.mock.calls.length).toBe(0);
        tab.simulate('click', {
            preventDefault: () => {},
          });
        expect(handleOnClick.mock.calls.length).toBe(1);
    });
});
