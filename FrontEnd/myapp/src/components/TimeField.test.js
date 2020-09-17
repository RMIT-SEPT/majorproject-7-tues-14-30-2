import React, {Component} from 'react';
import TimeField from './TimeField';
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { exportAllDeclaration } from '@babel/types';

Enzyme.configure({ adapter: new Adapter() });

describe("TimeField", () => {
    test("should render TimeField", () => {
      const wrapper = shallow(<TimeField />);
    });
  });

describe("TimeField", () => {
    it('tests onChange', () => {
        let newTime = null
        const props = {
             input: {
                  value: '21:30',
                  onChange: (stringEUTime) => {
                        newTime = stringEUTime
                  }
             }
        }})
});
