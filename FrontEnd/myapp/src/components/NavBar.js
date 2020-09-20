import React, {Component} from 'react';
import"./NavBar.css";
import{Link} from "react-router-dom"

  class NavBar extends Component{

    logout(){
      localStorage.clear();
    }

    UNSAFE_componentWillMount(){
      var userrole = localStorage.getItem("user_role")
      this.setState({role: userrole})
  }
  componentDidUpdate(){
    if(this.state.role !== localStorage.getItem("user_role")){
      var userrole = localStorage.getItem("user_role")
      this.setState({role: userrole})
  } 
      }

         role =()=>{
        if(this.state.role==="admin"|| this.state.role ==="Admin"||this.state.role==="ADMIN"){
          return (
          <div className="navbar">
          <div className="brand-title">SEPT Project</div>
          <div className="navbar-links">
            <ul>
               <li><Link to="/" onClick={this.logout()}>Logout</Link></li>
            </ul>
          </div>
        </div>
           ) }

      else if (this.state.role==="worker"||this.state.role==="Worker" || this.state.role==="WORKER"){
          return (
             <div className="navbar">
             <div className="brand-title">SEPT Project</div>
             <div className="navbar-links">
               <ul>
                  <li><Link to="/" onClick={this.logout()}>Logout</Link></li>
               </ul>
             </div>
           </div>
             ) }
           
      else if (this.state.role==="customer"||this.state.role==="Customer"||this.state.role==="CUSTOMER"){
        return (
          <div className="navbar">
          <div className="brand-title">SEPT Project</div>
          <div className="navbar-links">
            <ul>
               <li><Link to="/" onClick={this.logout()}>Logout</Link></li>
            </ul>
          </div>
        </div>

         ) }
        
        else{
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
      
  }

    render(){
      return(
      <div>
        {this.role()}
        </div>
      )}
  
  }
  export default NavBar