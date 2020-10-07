import React, { Component } from 'react'
import"./Home.css";


class Home extends Component{
    constructor(props){
        super(props)
    
      }

    UNSAFE_componentWillMount(){
    var check_refresh=localStorage.getItem("check_refresh")
    if(check_refresh==='refreshed'){
        localStorage.clear();
        localStorage.setItem("check_refresh", "");
        localStorage.setItem("user_role",'');
    
        }
        else{
        localStorage.clear();
        localStorage.setItem("check_refresh", "refreshed");
        localStorage.setItem("user_role",'');
        window.location.reload(false);
    
            }
        }

  
     render() {
        return (
           <div classname='home'>
              <h1 id='title'>WELCOME!</h1>
              <h2 id='title'>Login or sign up to book a service</h2>
              <br></br>
           </div>           
        )
     }

   }

export default Home