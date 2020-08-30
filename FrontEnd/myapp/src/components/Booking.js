import React, { Component } from 'react'
import"./Booking.css";


class Booking extends Component{
    constructor(props){
        super(props)
    
    
    this.state={
            date:'',
            time:''

    }
    }


render(){
    const {username,password} = this.state
return(
    <div>
        <h1 id='title'>Book an Appointment</h1>
        <br></br>
        <div className="button_bar">
        <button type="submit" class="booking_btn"><b>Book</b></button>
        </div>

    </div>
     )
    }
}

export default Booking