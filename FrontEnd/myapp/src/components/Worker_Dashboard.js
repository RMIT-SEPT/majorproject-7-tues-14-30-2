import React, { Component } from 'react'
import"./Worker_Dashboard.css";


class Worker_Dashboard extends Component{
    constructor(props){
        super(props)
    
    
        this.state = { //state is by default an object
            days: [
               { monday: '08:30-09:00', tuesday: '08:30-09:00', wednesday: '08:30-09:00', thursday: '08:30-09:00', friday: '08:30-09:00', saturday: 'off', sunday: 'off' },
               { monday: '10:00-12:30', tuesday: '10:00-12:30', wednesday: '10:00-12:30', thursday: '10:00-12:30', friday: '10:00-12:30', saturday: 'off', sunday: 'off'  },
               { monday: '13:30-14:00', tuesday: '13:30-14:00', wednesday: '13:30-14:00', thursday: '13:30-14:00', friday: '13:30-14:00', saturday: 'off', sunday: 'off' },
               { monday: '16:00-18:00', tuesday: '16:00-18:00', wednesday: '16:00-18:00', thursday: '16:00-18:00', friday: '16:00-18:00', saturday: 'off', sunday: 'off' }
            ]
         }
      }

      

      renderTableData() {
        return this.state.days.map((schedule, index) => {
           const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = schedule //destructuring
           return (
              <tr>
                 <td>{monday}</td>
                 <td>{tuesday}</td>
                 <td>{wednesday}</td>
                 <td>{thursday}</td>
                 <td>{friday}</td>
                 <td>{saturday}</td>
                 <td>{sunday}</td>
              </tr>
           )
        })
     }


     renderTableHeader() {
        let header = Object.keys(this.state.days[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
  
     render() {
        return (
           <div>
              <h1 id='title'>Welcome!</h1>
              <h2 id='title'>Weekly Schedule</h2>
              <table id='days'>
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