import React, {Component} from 'react';
import DateField from './DateField';
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { exportAllDeclaration } from '@babel/types';

Enzyme.configure({ adapter: new Adapter() });

describe("DateField", () => {
    test("should render  DateField", () => {
      const wrapper = shallow(<DateField />);
    });
  });


describe("DateField", () => {
    it('test onChange', () => {
        let newDate = null
        const props = {
             input: {
                  value: '20/09/2020',
                  onChange: (stringEUDate) => {
                        newDate = stringEUDate
                  }
             }
        }})
});