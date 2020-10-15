import React from 'react';
import { shallow , mount } from 'enzyme';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Add_Worker from './Add_Worker';

Enzyme.configure({ adapter: new Adapter() });


describe('<Add Worker/> component test',()=>{

 const wrapper = shallow(<Add_Worker/>)
//
 it('should have a btn component', ()=> {
    expect(wrapper.find('button')).toHaveLength(1);

});

it('calls onSubmit prop function when form is submitted', ()=> {
    const onSubmitFn = jest.fn();
    const wrapper = mount(<form onSubmit={onSubmitFn}/>);
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmitFn).toHaveBeenCalledTimes(1);
});


it('look for create button', ()=> {
    expect(wrapper.find('button').text()).toEqual('Create');
});

it('should have an empty username,name,password,address and phone state var', ()=> {
    expect(wrapper.state('username')).toEqual('');
    expect(wrapper.state('name')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
    expect(wrapper.state('address')).toEqual('');
    expect(wrapper.state('phone')).toEqual('');
});


})