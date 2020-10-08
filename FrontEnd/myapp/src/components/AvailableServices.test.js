import React, {Component} from 'react';
import Booking from './Booking';
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { exportAllDeclaration } from '@babel/types';

Enzyme.configure({ adapter: new Adapter() });

describe("Available Services", () => {
    test("test page is rendered", () => {
        const wrapper = shallow(<Booking />);
    });
});

describe("Available Service", () => {
    test("test table is included", () => {
        const wrapper = shallow(<Booking />);
        expect(wrapper.matchesElement('div table'));
    });
});