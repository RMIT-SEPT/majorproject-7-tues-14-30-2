import React, {Component} from 'react';
import Add_Availability from './Add_Availability';
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { exportAllDeclaration } from '@babel/types';

Enzyme.configure({ adapter: new Adapter() });

describe("Add Availability Page", () => {
    test("should render Add Availability Page", () => {
      const wrapper = shallow(<Add_Availability />);
    });
  });



describe("Start Time TimeField", () => {
    it('should change the start time', () => {
        let start_time = null
        const props = {
             input: {
                  value: '08:30',
                  handleStartTimeChange : (time) => {
                      start_time = time
                    }
             }
        }})
});

describe("End Time TimeField", () => {
    it('should change the end time', () => {
        let end_time = null
        const props = {
             input: {
                  value: '18:30',
                  handleEndTimeChange : (time) => {
                      end_time = time
                    }
             }
        }})
});

describe("Service", () => {
    it('should change the service', () => {
        let service = null
        const props = {
             input: {
                  value: 'Test Service',
                  handleServiceChange: (stringService) => {
                    service = stringService
                  }
             }
        }})
});

describe('Sunday Checkbox', () => {
    it('should check and uncheck the checkbox component', () => {
      const wrapper = shallow(<Add_Availability />);
      let checkbox = wrapper.find({ type: 'checkbox', name: 'sunday' });
      let checked = checkbox.simulate('change', { target: { checked: true } });
      expect(checked.equals(true))
      let unchecked = checkbox.simulate('change', { target: { checked: false } });
      expect(checked.equals(false))
    
    });
  });

  describe('Monday Checkbox', () => {
    it('should check and uncheck the checkbox component', () => {
      const wrapper = shallow(<Add_Availability />);
      let checkbox = wrapper.find({ type: 'checkbox', name: 'monday' });
      let checked = checkbox.simulate('change', { target: { checked: true } });
      expect(checked.equals(true))
      let unchecked = checkbox.simulate('change', { target: { checked: false } });
      expect(checked.equals(false))
    
    });
  });

describe('Tuesday Checkbox', () => {
    it('should check and uncheck the checkbox component', () => {
      const wrapper = shallow(<Add_Availability />);
      let checkbox = wrapper.find({ type: 'checkbox', name: 'tuesday' });
      let checked = checkbox.simulate('change', { target: { checked: true } });
      expect(checked.equals(true))
      let unchecked = checkbox.simulate('change', { target: { checked: false } });
      expect(checked.equals(false))
    
    });
  });

  describe('Wednesday Checkbox', () => {
    it('should check and uncheck the checkbox component', () => {
      const wrapper = shallow(<Add_Availability />);
      let checkbox = wrapper.find({ type: 'checkbox', name: 'wednesday' });
      let checked = checkbox.simulate('change', { target: { checked: true } });
      expect(checked.equals(true))
      let unchecked = checkbox.simulate('change', { target: { checked: false } });
      expect(checked.equals(false))
    
    });
  });

  describe('Thursday Checkbox', () => {
    it('should check and uncheck the checkbox component', () => {
      const wrapper = shallow(<Add_Availability />);
      let checkbox = wrapper.find({ type: 'checkbox', name: 'thursday' });
      let checked = checkbox.simulate('change', { target: { checked: true } });
      expect(checked.equals(true))
      let unchecked = checkbox.simulate('change', { target: { checked: false } });
      expect(checked.equals(false))
    
    });
  });

  describe('Friday Checkbox', () => {
    it('should check and uncheck the checkbox component', () => {
      const wrapper = shallow(<Add_Availability />);
      let checkbox = wrapper.find({ type: 'checkbox', name: 'friday' });
      let checked = checkbox.simulate('change', { target: { checked: true } });
      expect(checked.equals(true))
      let unchecked = checkbox.simulate('change', { target: { checked: false } });
      expect(checked.equals(false))
    
    });
  });

  describe('Saturday Checkbox', () => {
    it('should check and uncheck the checkbox component', () => {
      const wrapper = shallow(<Add_Availability />);
      let checkbox = wrapper.find({ type: 'checkbox', name: 'saturday' });
      let checked = checkbox.simulate('change', { target: { checked: true } });
      expect(checked.equals(true))
      let unchecked = checkbox.simulate('change', { target: { checked: false } });
      expect(checked.equals(false))
    
    });
  });
