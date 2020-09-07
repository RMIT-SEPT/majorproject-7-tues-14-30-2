import React, { Component } from 'react'
import"./Login.css";
import axios from 'axios'

class Login extends Component{
    constructor(props){
        super(props)
    
    
    this.state={
            username:'',
            password:'',
            
        }
    
    this.OnChange=this.OnChange.bind(this);
    this.OnSubmit=this.OnSubmit.bind(this);
    }

    OnChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
             }

    OnSubmit(e){
        e.preventDefault();
        var  login={
            username:this.state.username,
        }
        axios.post('http://localhost:8080/authenticate',{
            username:this.state.username,
            password:this.state.password
            })
        .then((res) => {
            console.log(res)
            localStorage.setItem("user_token",res.data.jwt);
           var token = localStorage.getItem("user_token")
            var username =login.username;
          axios.get(`http://localhost:8080/find/${username}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          
        }
    }
    )            
            .then((respone) => {
                console.log(respone)
            })
            .catch((err) =>{
            console.log(err)

         })

        })
        .catch((error) => {
            console.log(error)
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