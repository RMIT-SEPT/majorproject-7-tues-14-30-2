import React, { Component } from 'react'
import"./Customer_Dashboard.css";


class Customer_Dashboard extends Component{
    constructor(props){
        super(props)
    
        //dummy data for table, feature not properly implemented 
        this.state = { //state is by default an object
            appointments: [
               { day: 'Monday',    time: '08:30-09:00', service: 'Denist checkup', worker: 'Anthony' },
               { day: 'Wednesday', time: '9:00-10:00',  service: 'Haircut', worker: 'Stephanie'  },
               { day: 'Sunday',    time: '13:30-15:00', service: 'Accountant', worker: 'Catherine' },
            ]
         }
      }

      
      // renders cells in table
      renderTableData() {
        return this.state.appointments.map((schedule, index) => {
           const { day, time, service, worker } = schedule //destructuring
           return (
              <tr>
                 <td>{day}</td>
                 <td>{time}</td>
                 <td>{service}</td>
                 <td>{worker}</td>
              </tr>
           )
        })
     }

    //  renders the table header values 
     renderTableHeader() {
        let header = Object.keys(this.state.appointments[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
     
    //  function to redirect to booking page
     redirectToTarget = () => {
      this.props.history.push(`/Booking`)
     }

    //  dummy function to show that the buttons are not yet implememted
     sayHello() {
        alert('Go to page');
      }
  
     render() {
        return (
           <div>
              <h1 id='title'>Welcome!</h1>
              <br></br>
              <div className="button_bar">
                <button className="customer_btn" onClick={this.redirectToTarget}>Book Appointment</button>
                <button className="customer_btn" onClick={this.sayHello}>Cancel Appointment</button>
                <button className="customer_btn" onClick={this.sayHello}>View Appointments History</button>
              </div>

              <h2 id='title'>Upcoming Appointments</h2>
              <table id='appointments'>
                 <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }

   }

export default Customer_Dashboard