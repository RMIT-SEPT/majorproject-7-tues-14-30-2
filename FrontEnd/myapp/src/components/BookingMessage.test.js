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
    test("should call onSubmit on click", () => {
        window.alert = jest.fn();
        const book_btn = shallow(<book_btn />);
        book_btn.find('book_btn').simulate('click');
        expect(window.alert.mock.calls.length).toBe(0);
    });
});


describe("Confirm Message", () => {
    test("test onSubmit exists", () => {
        const wrapper = shallow(<Booking />);
        expect(wrapper.find('onSubmit()'));
    });
});


describe("Confirm Message", () => {
    test("should display confirmation message", () => {
        var message = false;
        const wrapper = shallow(<Booking />);
        message = expect(wrapper.find('onSubmit()')).alert;
        message = true;
    });
});
