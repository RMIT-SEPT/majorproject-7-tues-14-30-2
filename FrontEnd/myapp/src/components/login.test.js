import React from 'react';
import { shallow , mount } from 'enzyme';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Login from './Login';

Enzyme.configure({ adapter: new Adapter() });


describe('<Login/> component test',()=>{

 const wrapper = shallow(<Login/>)
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


it('look for login button', ()=> {
    expect(wrapper.find('button').text()).toEqual('Login');
});

it('should have an empty email and password state var', ()=> {
    expect(wrapper.state('username')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
});


})