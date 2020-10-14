import React, { Component } from 'react'
import"./Login.css";
import axios from 'axios'

class Login extends Component{
    constructor(props){
        super(props)
    //set all props as default null
    this.state={
            username:'',
            password:''
        }
    
    this.OnChange=this.OnChange.bind(this);
    this.OnSubmit=this.OnSubmit.bind(this);
    
 } 
 //load before render
 UNSAFE_componentWillMount(){
     //get check_refresh from localstorage
     var check_refresh=localStorage.getItem("check_refresh")
     if(check_refresh==='refreshed'){
         localStorage.clear();
        localStorage.setItem("check_refresh", "");
        localStorage.setItem("user_role",'');
    
      }
      else{
          //clear the localstorage 
        localStorage.clear();
        localStorage.setItem("check_refresh", "refreshed");
        localStorage.setItem("user_role",'');
        window.location.reload(false);
    
          }
        }
    
   
    OnChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
             }
             //this function will get call once login button has been click
    OnSubmit(e){
        e.preventDefault();
        var  login={
            username:this.state.username,
            password:this.state.password            
        }
        var username=login.username;
        //set username into localstorage
        localStorage.setItem("username",username);
        var password=login.password;
        localStorage.setItem("user_password",password);
        //pass user credentials to api 
        axios.post('http://localhost:8080/authenticate',{
            username:this.state.username,
            password:this.state.password
            })
        .then((res) => {
            //set user token into localsotrage
            localStorage.setItem("user_token",res.data.jwt);
            //get user token from localstorage 
           var token = localStorage.getItem("user_token")
           //assign username into username variable 
            var username =login.username;
            //pass username name into api for authorization
          axios.get(`http://localhost:8080/find/${username}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          
        }
    }
    )            
            .then((res) => {
                console.log(res.data)
                //get user information from api
                var role =res.data.role
                var name =res.data.name
                var contact =res.data.contact
                var address =res.data.address              
                //set user informatino into localstorage  
                localStorage.setItem("user_name",name);
                localStorage.setItem("user_role",role);
                localStorage.setItem("user_contact",contact);
                localStorage.setItem("user_address",address);


                //redirect page according to user roles
                if(role==="admin"|| role ==="Admin"||role==="ADMIN"){
                    this.props.history.push('/Admin_Dashboard')
                    //reload the page after reedirecting
                    window.location.reload(false);
                }   
    
                if(role==="worker"||role==="Worker" || role==="WORKER"){
                    this.props.history.push('/Worker_Dashboard')
                    window.location.reload(false);
                }
    
                if(role==="customer"||role==="Customer"||role==="CUSTOMER"){
                    this.props.history.push('/Customer_Dashboard')
                    window.location.reload(false);

                }
            })
            .catch((err) =>{
            console.log(err)
            // display alert pop up if user not found
            alert("User not found");


         })

        })
        .catch((error) => {
            console.log(error)
        // display alert pop up if user login credentials invalid 
            alert("Invalid login credentials")

        })
    }      
             
render(){
return(
    <div className="centered">
    <form onSubmit={this.OnSubmit}>

        <label>Username</label><br></br>
        <input type='text'
        name="username"
         value={this.state.username}
        onChange={this.OnChange} required
        />
        <br></br>
        <label>Password</label><br></br>
        <input type='password'
        name="password"
        value={this.state.password}
        onChange={this.OnChange} required
        />
    <br></br>
    <br></br>
    <button type="submit" className="login_btn"><b>Login</b></button>
    </form>
    <br></br>
    </div>
          )
    }
}

export default Login