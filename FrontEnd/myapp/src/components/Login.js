import React, { Component } from 'react'
import"./Login.css";
import axios from 'axios'

class Login extends Component{
    constructor(props){
        super(props)
    
    this.state={
            username:'',
            password:''
        }
    
    this.OnChange=this.OnChange.bind(this);
    this.OnSubmit=this.OnSubmit.bind(this);
    
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
    
   
    OnChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
             }

    OnSubmit(e){
        e.preventDefault();
        var  login={
            username:this.state.username,
            password:this.state.password            
        }
        var username=login.username;
        localStorage.setItem("username",username);
        var password=login.password;
        localStorage.setItem("user_password",password);
        axios.post('http://ec2-100-26-250-176.compute-1.amazonaws.com:8080/authenticate',{
            username:this.state.username,
            password:this.state.password
            })
        .then((res) => {
            localStorage.setItem("user_token",res.data.jwt);
           var token = localStorage.getItem("user_token")
            var username =login.username;
          axios.get(`http://ec2-100-26-250-176.compute-1.amazonaws.com:8080/find/${username}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          
        }
    }
    )            
            .then((res) => {
                console.log(res.data)
                var role =res.data.role
                var name =res.data.name
                var contact =res.data.contact
                var address =res.data.address                
                localStorage.setItem("user_name",name);
                localStorage.setItem("user_role",role);
                localStorage.setItem("user_contact",contact);
                localStorage.setItem("user_address",address);


                
                if(role==="admin"|| role ==="Admin"||role==="ADMIN"){
                    this.props.history.push('/Admin_Dashboard')
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
            alert("User not found");


         })

        })
        .catch((error) => {
            console.log(error)
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