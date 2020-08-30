import React, { Component } from 'react'
import"./Login.css";


class Login extends Component{
    constructor(props){
        super(props)
    
    
    this.state={
            username:'',
            password:''

    }
    }


handleUsernameChange = (event) =>{
    this.setState({
        username: event.target.value 
    })
}

handlePasswordChange = (event) =>{
    this.setState({
        password: event.target.value 
    })
}



render(){
    const {username,password} = this.state
return(
    <div class="centered">
    <form onSubmit={this.handleSubmit}>
    <label>Username</label><br></br>
    <input type="text"
     value={username}
    onChange={this.handleUsernameChange}
    />
    <br/>
    <label>Password</label><br></br>
    <input type="password"
    value={password}
    onChange={this.handlePasswordChange}
    />
    <br></br>
    <br></br>
    <button type="submit" class="login_btn"><b>Login</b></button>
    </form>
    </div>
     )
    }
}

export default Login