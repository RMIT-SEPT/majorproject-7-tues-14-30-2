import React, { Component } from 'react'
import"./Worker_Dashboard.css";
import axios from 'axios'



class Worker_Dashboard extends Component{
    
    constructor(props){
      super(props)  
      this.state = { //state is by default an object
          user: localStorage.getItem("user_name"),
          customer: "",
          bookings: [{}],
          headings: [{service: '', date: '', time: '', duration: '', customer: '', notes: ''}]
      }
      
    }

    componentDidMount() {
        var token = localStorage.getItem("user_token");
        console.log("token", localStorage.getItem("user_token"))
        const options = {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
                
        };
        const username = localStorage.getItem("username")
        console.log("username", username);
        console.log("name", localStorage.getItem("user_name"))
        const apiUrl = `http://localhost:8080/api/booking/findWorkerBooking/${username}`;
        axios.get(apiUrl, options)
          .then(res => {
            const bookings = res.data;
            this.setState({bookings});
            console.log('This is your data', res.data)
            console.log('service', res.data[0].bookedService.service)});
    }


      renderTableData() {
        // console.log("bookings", this.state.bookings.bookedService)
        return this.state.bookings.map((schedule) => {
           const { booking_date, booking_time, duration, notes, customer_username } = schedule //destructuring
          //  console.log(JSON.stringify(schedule.bookedService))
           return (
              <tr>
                 <td>{}</td>
                 <td>{booking_date}</td>
                 <td>{booking_time}</td>
                 <td>{duration}</td>
                 <td>{customer_username}</td>
                 <td>{notes}</td>
              </tr>
           )
        })
     }

     renderTableHeader() {
        // let headerCells =["time", "date"]
        let header = Object.keys(this.state.headings[0])
        // return headerCells
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
  
     render() {
        return (
           <div>
              <h1 id='title'>Welcome, {this.state.user}!</h1>
              <h2 id='title'>Weekly Schedule</h2>
              <table id='bookings'>
                 <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }

   }

export default Worker_Dashboard