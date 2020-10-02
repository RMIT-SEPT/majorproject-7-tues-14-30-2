import React, {Component} from 'react';
import Booking from './Booking';
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { exportAllDeclaration } from '@babel/types';

Enzyme.configure({ adapter: new Adapter() });

describe("Book Button", () => {
    test("test book button exists", () => {
        const wrapper = shallow(<Booking />);
        expect(wrapper.matchesElement(<button>Book</button>));
    });
});


describe("Book Button", () => {
    test("should call confirmMessage on click", () => {
        window.alert = jest.fn();
        const button = shallow(<Booking />);
        button.find('button').simulate('click');
        expect(window.alert.mock.calls.length).toBe(1);
    });
});


describe("Confirm Message", () => {
    test("test confirmMessage exists", () => {
        const wrapper = shallow(<Booking />);
        expect(wrapper.find('confirmMessage()'));
    });
});


describe("Confirm Message", () => {
    test("should display confirmation message", () => {
        var message = false;
        const wrapper = shallow(<Booking />);
        message = expect(wrapper.find('confirmMessage()')).alert;
        message = true;
    });
});
