import React, { Component } from 'react'
import"./Booking.css";
import DateField from './DateField'
import TimeField from './TimeField'
import Popup from 'reactjs-popup';


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
        <h1 class='title'>Book an Appointment</h1>
        <br></br>
        <div class = "inputField">
            <label>Date</label> <DateField/>
            <br/>
            <label>Time</label> <TimeField/>
        </div>
        <div className="button_bar">
        <Popup trigger={<button className="button"> Submit </button>} 
        modal
        nested
        >
        
        {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                    &times;
                </button>
            <div className="content"> Confirm booking? </div>
            <div className="actions">
                <Popup trigger={<button className="confirm"> Yes </button>}
                position="bottom center"
                nested
                > <span> Your booking has been confirmed! </span>
                </Popup>
            <button className="cancel" onClick={close}> No </button>  
            </div>
            </div>
        )}
        </Popup>
        </div>    

    </div>
     )       
    }
}

export default Booking