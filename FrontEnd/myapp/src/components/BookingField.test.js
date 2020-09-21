import React, {Component} from 'react';
import Booking from './Booking';
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { exportAllDeclaration } from '@babel/types';

Enzyme.configure({ adapter: new Adapter() });

describe("Booking Page", () => {
    test("should render Booking Page", () => {
      const wrapper = shallow(<Booking />);
    });
  });


describe("DateField", () => {
    it('should change the date', () => {
        let newDate = null
        const props = {
             input: {
                  value: '20/09/2020',
                  handleDateChange: (stringEUDate) => {
                        newDate = stringEUDate
                  }
             }
        }})
});

describe("TimeField", () => {
    it('should change the time', () => {
        let newTime = null
        const props = {
             input: {
                  value: '21:30',
                  handleDateChange: (stringEUTime) => {
                    newTime = stringEUTime
                  }
             }
        }})
});

describe("Worker", () => {
    it('should change the worker', () => {
        let worker = null
        const props = {
             input: {
                  value: 'Worker2',
                  handleDateChange: (stringWorker) => {
                    worker = stringWorker
                  }
             }
        }})
});

describe("Service", () => {
    it('should change the service', () => {
        let service = null
        const props = {
             input: {
                  value: 'Service2',
                  handleDateChange: (stringService) => {
                    service = stringService
                  }
             }
        }})
});

describe("Duration", () => {
    it('should change the duration', () => {
        let duration = null
        const props = {
             input: {
                  value: '2',
                  handleDateChange: (intDuration) => {
                    duration = intDuration
                  }
             }
        }})
});

describe("Notes", () => {
    it('should change the notes', () => {
        let notes = null
        const props = {
             input: {
                  value: 'New Notes....',
                  handleDateChange: (stringNotes) => {
                    notes = stringNotes
                  }
             }
        }})
});
