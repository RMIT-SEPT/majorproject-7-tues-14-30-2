import React, { Component } from 'react'
import"./Booking.css";
import DateField from './DateField'
import TimeField from './TimeField'
import PopUp from "./PopUp";


class Booking extends Component{
    constructor(props){
        super(props)
    
    
    this.state={
            date:'',
            time:''

    }
    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        })
    }
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
        <div className="button_bar">
        <input type="button" onClick={this.togglePop} value="Submit" />
        </div>
        {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}

    </div>
     )
    }
}

export default Booking