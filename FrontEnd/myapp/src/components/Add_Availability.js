import React, { Component } from 'react';
import"./Add_Availability.css";
import axios from 'axios';
import DatePicker from "react-datepicker";
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';


class Add_Availability extends Component{
    constructor(props){
        super(props)
    
    this.state={
            start_time:'',
            end_time:'',
            service: '',
            sunday:false,
            monday:false,
            tuesday:false,
            wednesday:false,
            thursday:false,
            friday:false,
            saturday:false,
            days:''
            
    };
    }

handleServiceChange = (event) =>{
    this.setState({
        service: event.target.value,
    })
}

handleStartTimeChange = (time) => {
    this.setState({
      start_time: time
    })
}
 
handleEndTimeChange = (time) => {
    this.setState({
      end_time: time
    })
}

handleCheckboxChange = (event) =>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
      });
    
}

  OnSubmit = (event) =>{
    event.preventDefault() 
    console.log(this.state.service)
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("user_password");
    var name = localStorage.getItem("user_name");
    var address = localStorage.getItem("user_address");
    var contact = localStorage.getItem("user_contact");
    var role = localStorage.getItem("user_role");
    var time =moment(this.state.time).format('HH:mm:ss');
    let input_days = [];

    if(this.state.sunday===true){
        input_days.push('1');
    }
    if(this.state.monday===true){
        input_days.push('2');
    }
    if(this.state.tuesday===true){
        input_days.push('3');
    }
    if(this.state.wednesday===true){
        input_days.push('4');
    }
    if(this.state.thursday===true){
        input_days.push('5');
    }
    if(this.state.friday===true){
        input_days.push('6');
    }
    if(this.state.saturday===true){
        input_days.push('7');
    }
    var available_days = '';
    var i;
    for (i = 0; i <input_days.length; i++) { 
        available_days += input_days[i];
        if(i<input_days.length-1){
            available_days += ',';
        }
    }

    var time =moment(this.state.time).format('HH:mm:ss');
    const newAvailability = {
        assigned_employee : {
            username:username,
            password: password,
            name: name,
            address: address,
            contact: contact,
            role: role
        },
        service: this.state.service,
        start_time: moment(this.state.start_time).format('HH:mm'),
        end_time: moment(this.state.end_time).format('HH:mm'),
        available_days: available_days
        
    }
    console.log(newAvailability)
    

    if(this.state.service === null || this.state.service ===''){
        alert('Please fill in the service');
    }
    else if(this.state.start_time === null || this.state.start_time ==='') {
        alert('Please select a time');        
    }
    else if(this.state.end_time === null || this.state.end_time === '') {
        alert('Please select a time');
    }
    else if(this.state.sunday===false && this.state.monday===false && 
        this.state.tuesday === false && this.state.wednesday === false &&
        this.state.thursday === false && this.state.friday === false && this.state.saturday === false){
            alert('Please select a day');
        }
    else if(this.state.available_days === null || this.state.available_days ===''){
        alert('Please select a day');
    }
    
    else{ 
        alert('New Working Time Added!');
        axios.post('http://ec2-54-208-156-197.compute-1.amazonaws.com:8080/api/services', newAvailability);
        this.props.history.push('/Worker_Dashboard')
    }
    
}


render(){
return(
    <div> 
        <br/>
        <br/>
        <div className="form">     
        <form onSubmit={this.OnSubmit}>
            <h1 class='title'>Add Availability</h1>
            
            <br/>
            <label>Start Time</label> 
            <br/>
            <TimePicker format="HH:mm" value={this.state.start_time} onChange={this.handleStartTimeChange} required/>
            <br/>
            <br/>

            <br/>
            <label>End Time</label> 
            <br/>
            <TimePicker format="HH:mm" value={this.state.end_time} onChange={this.handleEndTimeChange} required/>
            <br/>
            <br/>
            
            <label>Service</label>
            <br/>
            <input type="text" value={this.state.service} onChange={this.handleServiceChange} required/>
            <br/>
            <br/>
            
            <label>Available Days:</label>
            <br/>
            <br/>
            
            <label>Sunday
            <input name="sunday" type="checkbox" value= "sunday" checked={this.state.sunday} onChange={this.handleCheckboxChange}/>
            </label>
            <br/>
            <label>Monday
            <input name="monday" type="checkbox" value= "monday" checked={this.state.monday} onChange={this.handleCheckboxChange}/>
            </label>
            <label>Tuesday
            <input name="tuesday" type="checkbox" value= "tuesday" checked={this.state.tuesday} onChange={this.handleCheckboxChange}/>
            </label>
            <br/>
            <label>Wednesday
            <input name="wednesday" type="checkbox" value= "wednesday" checked={this.state.wednesday} onChange={this.handleCheckboxChange}/>
            </label>
            <br/>
            <label>Thursday
            <input name="thursday" type="checkbox" value= "thursday" checked={this.state.thursday} onChange={this.handleCheckboxChange}/>
            </label>
            <br/>
            <label>Friday
            <input name="friday" type="checkbox" value= "friday" checked={this.state.friday} onChange={this.handleCheckboxChange}/>
            </label>
            <br/>
            <label>Saturday
            <input name="saturday" type="checkbox" value= "saturday" checked={this.state.saturday} onChange={this.handleCheckboxChange}/>
            </label>

            
           
            <br />

        <button type="submit" className="add_btn" onClick={this.OnSubmit}><b>Add</b></button>
        </form>
        <br/>
        </div>
        

    </div>
     )       
    }
}
export default Add_Availability