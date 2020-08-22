import React, {Component} from 'react';
import"./NavBar.css";

  class NavBar extends Component{
    render(){
            return(
              

              <div class="topnav">
                <ul>
                <li><a href ="/Business_Contact">Contact Us</a></li>
                <li><a href="/Registration">SignUp</a></li>
                <li><a href="/">Login</a></li>
                </ul>
                </div>


              )

        }

}
export default NavBar