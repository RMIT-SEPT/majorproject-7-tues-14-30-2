import React, { Component } from 'react'
import"./Worker_Dashboard.css";
import axios from 'axios'


class Worker_Dashboard extends Component{
    
    constructor(props){
      super(props)  
      this.state = { //state is by default an object
          user: localStorage.getItem("user_name"),
          bookings: [
            {id: '', booking_date: '', booking_time: '', duration: '', notes: ''}
          ],
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
            console.log('This is your data', res.data)});
    }


      renderTableData() {
        return this.state.bookings.map((schedule, index) => {
           const { id, booking_date, booking_time, service, duration, notes } = schedule //destructuring
           return (
              <tr>
                 <td>{id}</td>
                 <td>{booking_date}</td>
                 <td>{booking_time}</td>
                 <td>{duration}</td>
                 <td>{service}</td>
                 <td>{notes}</td>
              </tr>
           )
        })
     }


     renderTableHeader() {
        let header = Object.keys(this.state.bookings[0])
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