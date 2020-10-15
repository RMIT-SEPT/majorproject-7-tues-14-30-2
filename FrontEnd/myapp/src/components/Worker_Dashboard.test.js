import React from "react";
import Worker_Dashboard from "./Worker_Dashboard";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe('testing Worker Dashboard component', () => {
    it('includes 1 div with class button_bar', () => {
        const wrapper = shallow(<Worker_Dashboard />);
        expect(wrapper.matchesElement('div.button_bar'));
    });

    it('Includes a button with class worker_button', () => {
        const wrapper = shallow(<Worker_Dashboard />);
        expect(wrapper.matchesElement('button.worker_btn'));
    });

    it('Includes a table', () => {
        const wrapper = shallow(<Worker_Dashboard />);
        expect(wrapper.matchesElement('div table'));
    });

    it('Page renders', () => {
        const wrapper = shallow(<Worker_Dashboard />);
    });
})