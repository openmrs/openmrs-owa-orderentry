import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import App from '../app/js/components/App'

describe('<App />', () => {
    it('should test that App renders correctly', () => {
        const wrapper = mount(<App/>);
        expect(wrapper.find("div")).to.have.length(2);
    });
});