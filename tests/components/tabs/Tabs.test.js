import React from 'react';
import Tabs from '../../../app/js/components/tabs/Tabs';

describe('`Tabs` component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<Tabs><p>hello</p></Tabs>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render contents at index 0 by default', () => {
        const wrapper = mount(<Tabs>
            <div tabName="tab 1"><p>Content 1</p></div>
            <div tabName="tab 2"><p>Content 2</p></div>
            <div tabname="tab 3"><p>Content 3</p></div>
            </Tabs>);
        expect(wrapper.find('.ui-tabs-panel').text()).toEqual('Content 1');
    });

    it('should render only content of active children', () => {
        const wrapper = mount(<Tabs defaultActiveTabIndex={1}>
            <div tabName="tab 1"><p>Content 1</p></div>
            <div tabName="tab 2"><p>Content 2</p></div>
            <div tabname="tab 3"><p>Content 3</p></div>
            </Tabs>);
        expect(wrapper.find('.ui-tabs-panel').text()).toEqual('Content 2');
    });

    it('should change the content when active index changes', () => {
        const props = {
            careSetting : jest.fn(),
            closeFormsOnTabChange: jest.fn(),
            clearSearchField: jest.fn(),
        }
        const wrapper = mount(<Tabs defaultActiveTabIndex={1} {...props}>
            <div tabName="tab 1"><p>Content 1</p></div>
            <div tabName="tab 2"><p>Content 2</p></div>
            <div tabname="tab 3"><p>Content 3</p></div>
            </Tabs>);
        const children = (wrapper.find('.ui-tabs-nav').children());
        wrapper.instance().handleTabClick(2, 'tab 3');
        expect(wrapper.find('.ui-tabs-panel').text()).toEqual('Content 3');
    });
});
