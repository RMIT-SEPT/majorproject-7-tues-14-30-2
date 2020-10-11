import React, { Component } from 'react'
import "./Business_Contact.css";


class Business_Contact extends Component{

    constructor(props){
        super(props)
    
    this.state={
            email:'',
            phone:'',
            message:''

        }
    }

    handleEmailChange = (event) =>{
        this.setState({
            email: event.target.value 
        })
    }
    
    handlePhoneChange = (event) =>{
        this.setState({
            phone: event.target.value 
        })
    }

    handleMessageChange = (event) =>{
        this.setState({
            message: event.target.value 
        })
    }


    render(){
        const {email,phone,message} = this.state
    return(
        <div class="centered">
        <form onSubmit={this.handleSubmit}>
        <label>Email</label><br></br>
        <input type="text"
         value={email}
        onChange={this.handleEmailChange}
        />
        <br/>
        <label>Phone Number</label><br></br>
        <input type="text"
        value={phone}
        onChange={this.handlePhoneChange}
        />
         <br/>
        <label>Leave your message</label><br></br>
        <textarea
        value={message}
        onChange={this.handleMessageChange}
        />
        <br></br>
        <br></br>
        <button type="submit" class="submit_btn"><b>Submit</b></button>
        </form>
        </div>
         )
        }
    }
    export default Business_Contact