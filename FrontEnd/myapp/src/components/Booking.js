import React, { Component } from 'react'
import"./Booking.css";
import DateField from './DateField'
import TimeField from './TimeField'
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker'
import axios from 'axios'


class Booking extends Component{
    constructor(props){
        super(props)
    
    this.state={
            date: new Date(),
            time:'00:00',
            worker:'',
            service:'',
            duration:'',
            notes:'',
    };
    }

handleNotesChange = (event) =>{
    this.setState({
        notes: event.target.value 
    })
}

handleServiceChange = (event) =>{
    this.setState({
        service: event.target.value 
    })
}

handleWorkerChange = (event) =>{
    this.setState({
        worker: event.target.value 
    })
}

handleDurationChange = (event) =>{
    this.setState({
        duration: event.target.value,
    })
}

handleDateChange = (date) => {
    this.setState({
      date: date
    })
  }

handleTimeChange = (time) => {
    this.setState({
      time: time
    })
  }

confirmMessage = (event) =>{
    event.preventDefault()
    console.log("Date: " + this.state.date);
    console.log("Time: " + this.state.time);
    console.log("Worker: " + this.state.worker);
    console.log("Service: " + this.state.service);
    console.log("Duration: " + this.state.duration);
    console.log("Notes: " + this.state.notes);

    alert('Your booking has been confirmed!');
    
}


render(){
    const {username,password} = this.state
return(
    <div> 
        <h1 class='title'>Book an Appointment</h1>
        <br></br>

        <form onSubmit={this.handleSubmit}>
        <div class = "inputField">
            <label>Service</label> 
            <br/>
            <select name = 'service' value={this.state.service} onChange={this.handleServiceChange}> 
                  <option name="service1">Service 1</option>
                  <option name="service2">Service 2</option>
                  <option name="service3">Service 3</option>
            </select>
            <br/>
            <br/>
            <label>Worker</label> 
            <br/>
            <select name = 'worker' value={this.state.worker} onChange={this.handleWorkerChange}> 
                  <option name="worker1">Worker 1</option>
                  <option name="worker2">Worker 2</option>
                  <option name="worker3">Worker 3</option>
            </select>
            <br/>
            <label>Duration</label>
            <br/>
            <input type ='text' name='duration' value={this.state.duration} onChange={this.handleDurationChange}/>
            <br/>
            <label>Date</label> 
            <br/>

            <DatePicker name = 'date' onChange={this.handleDateChange} value={this.state.date}/>
            
            <br/>
            <label>Time</label> 
            <br/>

            <TimePicker name = 'time' onChange={this.handleTimeChange} value={this.state.time}/>

            
            <br/>
            <label>Notes</label>
            <br/>
            <input type = 'text' name = 'notes' value={this.state.notes} onChange={this.handleNotesChange}/>
            <br/>
            
       
        </div>
        <button type = 'submit' className="book_btn" onClick={this.confirmMessage}>Book</button>   

        </form>

    </div>
     )       
    }
}

export default Booking