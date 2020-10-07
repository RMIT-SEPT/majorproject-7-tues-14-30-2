import React, { Component } from 'react';
import"./Booking.css";
import axios from 'axios';
import DatePicker from "react-datepicker";
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';


class Booking extends Component{
    constructor(props){
        super(props)
    
    this.state={
            date: new Date(),
            time:'',
            worker:'',
            service:'',
            duration:'',
            notes:'',
            isDataFetched: false,
            services: [{}],
            headings: [{id: '', service: '', worker: '', days: '', time: ''}]   
    }
    }

    componentDidMount() {   
        const role = 'WORKER'; 
        axios.get(`http://localhost:8080/api/user/getRole/${role}`) 
            .then((response) => {
                const employee = response.data.map(({username}) => username);
                console.log(employee);
                var i;  
               let urlArray = [];
               for(i=0; i < employee.length; i++) {
                   urlArray[i] = `http://localhost:8080/api/services/findService/${employee[i]}`;
               }
               console.log(urlArray);
               let promiseArray = urlArray.map(url => axios.get(url)); 
               console.log(promiseArray);
                axios.all(promiseArray) 
                .then(results => {
                    this.setState({services : results.map(r => r.data[0])});
                    this.setState({isDataFetched : true})
                    console.log(results);
                })
                
                     
        })
                        
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
        //convert to year-month-day
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
    var info={
        workername:this.state.worker,
        servicename:this.state.service
    }
    var workername = info.workername;
    var servicename = info.servicename;
    
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("user_password");
    var name = localStorage.getItem("user_name");
    var address = localStorage.getItem("user_address");
    var contact = localStorage.getItem("user_contact");
    var role = localStorage.getItem("user_role");
    //convert timestamp to hh-mm-ss
    var time =moment(this.state.time).format('HH:mm:ss');


    if(this.state.date == null) {
        alert('Please select a date');
    } 
    else if(this.state.time == null || this.state.time == '') {
        alert('Please select a time');
    }
    else if(this.state.duration == null || this.state.duration == '') {
        alert('Please fill in the duration');
    }
    else if(this.state.notes == null || this.state.notes == '') {
        alert('Please fill in the notes');
    }
    else {        
    axios.post(`http://localhost:8080/api/booking/${workername}/${servicename}`,{
        booking_date: this.state.date,
        booking_time:time,
        notes: this.state.notes,
        customer : 
            {
                username:username,
                password: password,
                name: name,
                address: address,
                contact: contact,
                role: role
            },
        booked_service:servicename,
        duration: this.state.duration
    })
          .then((res)=>{
            console.log(res);
            alert('Your booking has been confirmed!');
            window.location.reload(false);
         })

        

        .catch((error)=>{
            console.log(error)
        })   
    }
  }    

renderTableData() {
    return this.state.services.map((schedule) => {
        const { id, service, assigned_employee, available_days, start_time } = schedule
        /*
        let id = schedule.id
        let service = schedule.service
        let assigned_employee = schedule.assigned_employee
        let available_days = schedule.available_days
        let start_time = schedule.start_time
        */

        return (
            this.state.services.length === 0 ?
            <tr align="center">
                <td colspan="5">0 Services Available.</td>
            </tr> :
            <tr>
                <td>{id}</td>
                <td>{service}</td>
                <td>{assigned_employee}</td>
                <td>{available_days}</td>
                <td>{start_time}</td>
            </tr>
        )
    })
}

renderTableHeader() {
    let header = Object.keys(this.state.headings[0])
    return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })
}

render(){
// if(!this.state.isDataFetched) return null;    
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
              
         <form onSubmit={this.onSubmit}>
        <div class = "inputField">
            <label>Service</label> 
            <br/>
            <select name = 'service' value={this.state.service} onChange={this.handleServiceChange}>   
                  <option name="service1">Service1</option>
                  <option name="service2">Hair Salon</option>
                  <option name="service3">Accounting Firm</option>
            </select>
            <br/>
            <br/>
            <label>Worker</label> 
            <br/>
            <select name = 'worker' value={this.state.worker} onChange={this.handleWorkerChange}> 
                  <option name="worker1">Worker1</option>
                  <option name="worker2">Stephanie</option>
                  <option name="worker3">Catherine</option>
                  </select>
            <br/>
            <br/>
            <label>Date</label> 
            <br/>
            <DatePicker value={this.state.date} onChange={this.handleDateChange} minDate={new Date()}/>
            <br/>
            <label>Time</label> 
            <br/>
            <TimePicker value={this.state.time} onChange={this.handleTimeChange} />

              <br/>
            <br/>
            <label>Duration(mins)</label>
            <br/>
            <input type='number' min="1" name='duration' value={this.state.duration} onChange={this.handleDurationChange}/>
            <br/>
           
            <label>Notes</label>
            <br/>
            <input type = 'text' name = 'notes' value={this.state.notes} onChange={this.handleNotesChange}/>
            <br/>
            
       
        </div>
        <button type = 'submit' className="book_btn" onClick={this.onSubmit}>Book</button>   

        </form>

    </div>
    )       
    }
  }

export default Booking