import React, { Component } from 'react'
import"./Worker_Dashboard.css";
import axios from 'axios'



class Worker_Dashboard extends Component{
    
    constructor(props){
      super(props)  
      this.state = { //state is by default an object
          user: localStorage.getItem("user_name"),
          isDataFetched: false, //boolean to make sure render isn't called before data is fetched
          bookings: [{}],
          headings: [{service: '', date: '', time: '', duration: '', customer: '', notes: ''}]
      }      
    }

    componentDidMount() {
        var token = localStorage.getItem("user_token");
        // console.log("token", localStorage.getItem("user_token"))
        const options = {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
        };
        const username = localStorage.getItem("username")
        // console.log("username", localStorage.getItem("username"))
        const apiUrl = `http://ec2-54-208-156-197.compute-1.amazonaws.com:8080/api/booking/findWorkerBooking/${username}`;
        axios.get(apiUrl) //fetching data 
          .then(res => {
            const bookings = res.data;
            this.setState({bookings}); //assign fetched data to bookings
            this.setState({isDataFetched : true}) //data has now been fetched and can be rendered
            console.log('This is your data', bookings)
            })
            .catch(error => {
                console.error("whoops", error.message);
            });
    }


      renderTableData() {
        return this.state.bookings.map((schedule) => {
           const { booking_date, booking_time, duration, notes } = schedule //destructuring
           let service = schedule.bookedService.service //set service so it can be accessed
           let customerName = schedule.customer.name //set name so it can be accessed 

           return (
              <tr>
                 <td>{service}</td>
                 <td>{booking_date}</td>
                 <td>{booking_time}</td>
                 <td>{duration}</td>
                 <td>{customerName}</td>
                 <td>{notes}</td>
              </tr>
           )
        })
     }

     renderTableHeader() {
        let header = Object.keys(this.state.headings[0]) //headings contains only the values we want to display
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }

     redirectToTarget = () => {
      this.props.history.push(`/Add_Availability`)
     }
  
     render() {
        // console.log("data fetched?", this.state.isDataFetched)
        if(!this.state.isDataFetched) return null; //ensures render won't run until data is fetched
        return (
           <div>
              <h1 id='title'>Welcome, {this.state.user}!</h1>
              <div className = 'buttonBar'>
               <button className="worker_button" onClick={this.redirectToTarget}>Add Availability</button>
              </div>
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