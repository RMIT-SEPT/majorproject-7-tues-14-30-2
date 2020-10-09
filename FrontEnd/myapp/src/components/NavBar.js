import React, {Component} from 'react';
import"./NavBar.css";
import{Link} from "react-router-dom"

  class NavBar extends Component{
    
   logout(){
     //set local storage key to empty
  localStorage.setItem("user_role",'');
  localStorage.setItem("user_name",'');
  localStorage.setItem("user_token",'');
  localStorage.setItem("username",'');
  localStorage.setItem("user_password",'');
  localStorage.setItem("user_contact",'');
  localStorage.setItem("user_address",'');
  }
 
      
       role =()=>{
         //get user role from localstorage
        var role = localStorage.getItem("user_role");

        if(role===''){
            return(
              <div className="navbar">
              <div className="brand-title">SEPT Project</div>
              <div className="navbar-links">
                <ul>
                   <li><Link to="/" >Login</Link></li>
                   <li><Link to="/Registration">Signup</Link></li>
                   <li><Link to="/Business_Contact">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            )
                  }
        
       else {

        // if user is admin display admin navbar
        if(role==="admin"||role ==="Admin"||role==="ADMIN"){
          return (
          <div className="navbar">
          <Link to="Admin_Dashboard"><div className="brand-title">SEPT Project</div></Link>
          <div className="navbar-links">
            <ul>
               <li><Link to="/" onClick={this.logout}>Logout</Link></li>
            </ul>
          </div>
        </div>
           ) }

        // if user is worker display worker navbar
      else if (role==="worker"||role==="Worker" || role==="WORKER"){
          return (
             <div className="navbar">
          <Link to="/Worker_Dashboard"><div className="brand-title">SEPT Project</div></Link>
             <div className="navbar-links">
               <ul>
                  <li><Link to="/"onClick={this.logout} >Logout</Link></li>
               </ul>
             </div>
           </div>
             ) 
          
            }
                   // if user is customer display customer navbar
      else if (role==="customer"||role==="Customer"||role==="CUSTOMER"){
        return (
          <div className="navbar">
          <Link to="/Customer_Dashboard"><div className="brand-title">SEPT Project</div></Link>
          <div className="navbar-links">
            <ul>
               <li><Link to="/"onClick={this.logout} >Logout</Link></li>
            </ul>
          </div>
        </div>
          
         )
         }
        }

        }
        


    render(){
      return(
      <div>
        {this.role()}
        </div>
      )}
  
  }
  export default NavBar