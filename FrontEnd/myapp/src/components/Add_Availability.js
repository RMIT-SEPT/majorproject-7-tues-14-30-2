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
            date: new Date(),
            time:'',
            duration: ''
            
    };
    }

handleDurationChange = (event) =>{
    this.setState({
        duration: event.target.value,
    })
}

handleDateChange = (date) => {
    this.setState({
      date :moment(date).format('YYYY-MM-DD')

      })
  }


handleTimeChange = (time) => {
    this.setState({
      time: time
    })
}
  

  onSubmit = (event) =>{
    event.preventDefault() 
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("user_password");
    var name = localStorage.getItem("user_name");
    var address = localStorage.getItem("user_address");
    var contact = localStorage.getItem("user_contact");
    var role = localStorage.getItem("user_role");
    var time =moment(this.state.time).format('HH:mm:ss');

        if(this.state.date === null) {
            alert('Please select a date');
        } 
        else if(this.state.time === null || this.state.time === '') {
            alert('Please select a time');
        }
        else if(this.state.duration === null || this.state.duration === '') {
            alert('Please fill in the duration');
        }
        else {
            alert('New Working Time Added!');
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
            <label>Date</label> 
            <br/>
            <DatePicker value={this.state.date} onChange={this.handleDateChange} minDate={new Date()} required/>
            <br/>
            <br/>
            <label>Time</label> 
            <br/>
            <TimePicker value={this.state.time} onChange={this.handleTimeChange} required/>

            <br/>
            <br/>
            
            <label>Duration(mins)</label>
            <br/>
            <input type='number' min="1" name='duration' value={this.state.duration} onChange={this.handleDurationChange} required/>
            <br/>
            <br/>
            
        <button type="submit" className="add_btn"><b>Add</b></button>
        </form>
        <br/>
        </div>
        

    </div>
     )       
    }
}
export default Add_Availability