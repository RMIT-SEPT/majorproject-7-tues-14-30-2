import React from "react";
import Customer_Dashboard from "./Customer_Dashboard";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe('testing Customer Dashboard component', () => {
    let wrapper; 
    beforeEach(() => { wrapper = shallow(<Customer_Dashboard />); });
    it('includes 1 div with class button_bar', () => {
        const wrapper = shallow(<Customer_Dashboard />);
        expect(wrapper.matchesElement('div.button_bar'));
    });

    it('Includes 3 buttons with class customer button', () => {
        const wrapper = shallow(<Customer_Dashboard />);
        expect(wrapper.matchesElement('button.customer_btn'));
    });

    it('Includes a table', () => {
        const wrapper = shallow(<Customer_Dashboard />);
        expect(wrapper.matchesElement('div table'));
    });

    it('Page renders', () => {
        const wrapper = shallow(<Customer_Dashboard />);
    });
})