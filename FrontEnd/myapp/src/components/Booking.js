import React, { Component } from 'react'
import"./Booking.css";
import DateField from './DateField'
import TimeField from './TimeField'


class Booking extends Component{
    constructor(props){
        super(props)
    
    
    this.state={
            date:'',
            time:''

    }
   
    }

confirmMessage() {
    alert('Your booking has been confirmed!');
}

render(){
    const {username,password} = this.state
return(
    <div> 
        
        <h1 class='title'>Book an Appointment</h1>
        <br></br>
        <div class = "inputField">
            <label>Date</label> <DateField/>
            <br/>
            <label>Time</label> <TimeField/>
        </div>
        <button className="book_btn" onClick={this.confirmMessage}>Book</button>   

    </div>
     )       
    }
}

export default Booking