import React, { Component } from 'react'
import"./Booking.css";
import DateField from './DateField'
import TimeField from './TimeField'


class Booking extends Component{
    constructor(props){
        super(props)
    
    this.state={
            date:'',
            time:'',
            worker:'',
            service:'',
            notes:''
    }
}

confirmMessage() {
    alert('Your booking has been confirmed!');
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
            <br/>
            <label>Date</label> 
            <br/>
            <DateField/>
            <br/>
            <label>Time</label> 
            <br/>
            <TimeField/>
            <br/>
            <label>Notes</label>
            <br/>
            <input type = 'text' name = 'notes' value={this.state.notes} onChange={this.handleNotesChange}/>
            <br/>
            
       
        </div>
        <button className="book_btn" onClick={this.confirmMessage}>Book</button>   

        </form>

    </div>
     )       
    }
}

export default Booking