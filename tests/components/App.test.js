import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-15';
import App from '../../app/js/components/App';

configure({ adapter: new Adapter() });

describe('<App />', () => {

    it('should test that App renders correctly', () => {
        const wrapper = shallow( <App/>)
        expect(wrapper.find("div")).to.have.length(1);
    });
});
