import React, { Component } from 'react'
import"./Booking.css";
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
            services: [
                { service: 'Dental Clinic', opening: '8:00am - 4:00pm', days: 'Monday - Friday', worker: 'Anthony'  },
                { service: 'Hair Salon', opening: '9:00am - 5:30pm', days: 'Monday - Saturday', worker: 'Stephanie' },
                { service: 'Accounting Firm', opening: '10:00am - 4:00pm', days: 'Tuesday - Sunday', worker: 'Catherine' },
            ]
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

    if(this.state.duration == null || this.state.duration == '') {
        alert('Please fill in the duration');
    } 
    else if(this.state.date == null) {
        alert('Please select a date');
    }
    else if(this.state.time == null || this.state.time == '00:00') {
        alert('Please select a time');
    }
    else if(this.state.notes == null || this.state.notes == '') {
        alert('Please fill in the notes');
    }
    else {
        alert('Your booking has been confirmed!');
    }    
    
}


renderTableData() {
    return this.state.services.map((schedule, index) => {
       const { service, opening, days, worker } = schedule //destructuring
       return (
          <tr>
             <td>{service}</td>
             <td>{opening}</td>
             <td>{days}</td>
             <td>{worker}</td>
          </tr>
        )
    })
}

renderTableHeader() {
    let header = Object.keys(this.state.services[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
}


render(){
    const {username,password} = this.state
return(
    <div> 
        <h1 class='title'>Book an Appointment</h1>
        <br></br>

        <h2 id='heading'>Available Services</h2>
              <table id='services'>
                 <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                 </tbody>
              </table>

        <form onSubmit={this.handleSubmit}>
        <div class = "inputField">
            <label>Service</label> 
            <br/>
            <select name = 'service' value={this.state.service} onChange={this.handleServiceChange}>
                  <option disabled selected value>-- Select a service --</option>   
                  <option name="service1">Dental Clinic</option>
                  <option name="service2">Hair Salon</option>
                  <option name="service3">Accounting Firm</option>
            </select>
            <br/>
            <br/>
            <label>Worker</label> 
            <br/>
            <select name = 'worker' value={this.state.worker} onChange={this.handleWorkerChange}> 
                  <option disabled selected value>-- Select a worker --</option>
                  <option name="worker1">Anthony</option>
                  <option name="worker2">Stephanie</option>
                  <option name="worker3">Catherine</option>
            </select>
            <br/>
            <br/>
            <label>Duration</label>
            <br/>
            <input type ='text' name='duration' value={this.state.duration} onChange={this.handleDurationChange}/>
            <br/>
            <br/>
            <label>Date</label> 
            <br/>

            <DatePicker name = 'date' onChange={this.handleDateChange} value={this.state.date}/>
            
            <br/>
            <br/>
            <label>Time</label> 
            <br/>

            <TimePicker name = 'time' onChange={this.handleTimeChange} value={this.state.time}/>

            
            <br/>
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