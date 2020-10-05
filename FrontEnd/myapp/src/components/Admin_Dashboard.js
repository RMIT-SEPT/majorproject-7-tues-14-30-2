import React, { Component } from 'react'
import"./Admin_Dashboard.css";


class Admin_Dashboard extends Component{
    constructor(props){
        super(props)
    
      }

      redirectToTarget = () => {
         this.props.history.push(`/Add_Worker`)
        }

     render() {
        return (
           <div>
              <h1 id='title'>Hello Admin!</h1>
              <br></br>
              <div className="button_bar">
                <button className="customer_btn" onClick={this.redirectToTarget}>Create Worker</button>
                </div>
           </div>
        )
     }

   }

export default Admin_Dashboard