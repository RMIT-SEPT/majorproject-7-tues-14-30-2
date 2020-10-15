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
    
        //set props to it assign value
    this.state={
            date: new Date(),
            time:'',
            worker:'',
            service:'',
            duration:'',
            notes:'',
            isDataFetched: false,
            services: [{}],
            headings: [{service: '', worker: '', days: '', start_time: '', end_time: ''}],
            selectedService:'',
            selectedWorker:'',
            workerUsername:'',
            start_time:'',
            end_time:'',
            availableDays:''   
    };
    }
    
    componentDidMount() {   
        const role = 'WORKER'; 
        axios.get(`http://localhost:8080/api/user/getRole/${role}`) // returns all users with role 'WORKER'
            .then((response) => {
                const employee = response.data.map(({username}) => username); // adds all usernames of workers into an array
                var i;
                var j =0;  
               let urlArray = [];
               
               for(i=0; i < employee.length; i++) {
                urlArray[i] = `http://localhost:8080/api/services/findService/${employee[i]}`; // adds GET URL for each worker into an array
                }
                 
               let promiseArray = urlArray.map(url => axios.get(url)); 
                axios.all(promiseArray) // performs the GET request(s)
                .then(results => {
                    let newResults = [];
                    for(i=0; i < results.length; i++) {
                        if(results[i].data[0] !== undefined) {
                            newResults[j] = results[i];
                            j++;
                        }
                    }
                    this.setState({services : newResults.map(r => r.data)[0]}); // adds results into services array
                    this.setState({isDataFetched : true})
                })
                .catch(err => {
                    if (err.response) {
                        console.log(err)
                    } else if (err.request) {
                        console.log(err)
                    } else {
                        console.log(err)
                    }
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
        selectedService: event.target.value, 
    })
}

handleWorkerChange = (event) =>{
    this.setState({
        selectedWorker: event.target.value 
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
      axios.get(`http://localhost:8080/api/services/findEmployees/${this.state.selectedService}`)
      .then(response => {
          const worker = response.data.map(({name}) => name)[0];
          const uname = response.data.map(({username}) => username)[0];
          this.setState({selectedWorker : worker})
          this.setState({workerUsername : uname})
        //  console.log(this.state.selectedWorker);
      //})
      //get start time, end time and available days
      axios.get(`http://localhost:8080/api/services/findService/${this.state.workerUsername}`)
      .then(response => {
          const start = response.data.map(({start_time}) => start_time)[0];
          const end = response.data.map(({end_time}) => end_time)[0];
          const days = response.data.map(({available_days}) => available_days)[0];
          this.setState({start_time : start})
          this.setState({end_time : end})
          this.setState({availableDays: days})
      })
      
//prevent page to refresh 
//    event.preventDefault() 
    var info={
        workername:this.state.selectedWorker,
        servicename:this.state.selectedService
    }
    //assign user selected workername and service into variable
    var workername = info.workername;
    var servicename = info.servicename;
    //retrieve customer information from localstorage
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("user_password");
    var name = localStorage.getItem("user_name");
    var address = localStorage.getItem("user_address");
    var contact = localStorage.getItem("user_contact");
    var role = localStorage.getItem("user_role");
    //convert timestamp to hh-mm-ss
    var time =moment(this.state.time).format('HH:mm:ss');
    //get the day from the date(Sunday = 0, Saturday = 6)
    var selectedDate = moment(this.state.date); 
    //add the day index by 1 to match with backend
    var day_index = selectedDate.day() + 1;
    console.log(day_index)
    
    // var available_day = this.state.services[service_index].available_days
    var availDays = this.state.availableDays;
    
    //booking validation
    if(this.state.services.length === 0) {
        alert('Sorry no available services!');
    }
    else if(this.state.selectedService === null || this.state.selectedService === '' || this.state.selectedService === 'default') {
        alert('Please select a service');
    }
    else if(this.state.date === null) {
        alert('Please select a date');
    } 
    else if(this.state.time === null || this.state.time === '') {
        alert('Please select a time');
    }
    else if(this.state.duration === null || this.state.duration === '') {
        alert('Please fill in the duration');
    }
    else if(this.state.notes === null || this.state.notes === '') {
        alert('Please fill in the notes');
    }
    //time range validation
    else if(this.state.start_time != '' && this.state.end_time != ''){
        if(Number(time.substring(0,1)) < Number(this.state.start_time.substring(0,1)) || 
            Number(time.substring(0,1)) > Number(this.state.end_time.substring(0,1))){
            alert('select time in range' + this.state.start_time + '-' + this.state.end_time)
    }}
    //day validation
    else if(availDays != '' && availDays.includes(day_index) === false){
        alert('Please select date within the available day range')
    }
    else {       
    //pass workername and servicename to api 
    axios.post(`http://ec2-54-208-156-197.compute-1.amazonaws.com::8080/api/booking/${workername}/${servicename}`,{
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
            //page refresh after worker has been created
            window.location.reload(false);
         })

        

        .catch((error)=>{
            //display error for debug
            console.log(error)
        })   
    }
    })
  }    


/* 
*  method to return available days as string
*/
getAvailableDays(available_days) { 
    var days;
    var i;
    for(i = 0; i < available_days.length;) {
        if(available_days[i] === "1") {
            days = "Sunday";
            break;
        } else if(available_days[i] === "2") {
            days = "Monday";
            break;
        } else if(available_days[i] === "3") {
            days = "Tuesday";
            break;
        } else if(available_days[i] === "4") {
            days = "Wednesday";
            break;
        } else if(available_days[i] === "5") {
            days = "Thursday";
            break;
        } else if(available_days[i] === "6") {
            days = "Friday";
            break;
        } else if(available_days[i] === "7") {
            days = "Saturday";
            break;
        }
    }
    
    for(i = 2; i < available_days.length;) {
        if(available_days[i] === "1") {
            days += ", Sunday";
            break;
        } else if(available_days[i] === "2") {
            days += ", Monday";
            break;
        } else if(available_days[i] === "3") {
            days += ", Tuesday";
            break;
        } else if(available_days[i] === "4") {
            days += ", Wednesday";
            break;
        } else if(available_days[i] === "5") {
            days += ", Thursday";
            break;
        } else if(available_days[i] === "6") {
            days += ", Friday";
            break;
        } else if(available_days[i] === "7") {
            days += ", Saturday";
            break;
        }
    }
    return days;      
}

renderTableData() {
    return this.state.services.map((schedule) => {
        const { service, available_days, start_time, end_time } = schedule
        let id = schedule.id
        let assigned_employee = schedule.assigned_employee.name
        let avail_days = this.getAvailableDays(available_days)
    
        return (
            <tr key={id}>
                <td>{service}</td>
                <td>{assigned_employee}</td>
                <td>{avail_days}</td>
                <td>{start_time}</td>
                <td>{end_time}</td>
            </tr>
        )    
    })
}

renderTableHeader() {
    let header = Object.keys(this.state.headings[0])
    return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase().replace("_", " ")}</th>
    })
}

render(){
if(!this.state.isDataFetched) return null;    
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
            <select name = 'service' value={this.state.selectedService} onChange={this.handleServiceChange}>
                <option value="default">-- Select a service --</option>
                {this.state.services.map((service) => <option key={service.id} value={service.service}>{service.service}</option>)}   
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
            
        <button type = 'submit' className="book_btn" onClick={this.onSubmit}>Book</button>        
        </div>

        </form>

    </div>
    )       
    }
  }

export default Booking