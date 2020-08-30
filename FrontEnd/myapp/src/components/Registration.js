import React,{Component} from 'react'
import"./Registration.css";




    class Registration extends Component{
        constructor(props){
            super(props)

        this.state={
            name:'',
            address:'',
            phone:''
            
        }

         }

handleNameChange = (event) =>{
    this.setState({
        name: event.target.value 
    })
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

handleAddressChange = (event) =>{
    this.setState({
        address: event.target.value 
    })
}

handlePhoneChange = (event) =>{
    this.setState({
        phone: event.target.value 
    })
}

    render(){
        const {name,username,password,address,phone} = this.state
    return(
        <div class="centered">
        <form onSubmit={this.handleSubmit}>

        <div classname="form"> 

        <label>Name</label><br></br>
        <input type='text'
        value={name}
        onChange={this.handleNameChange}
        />
        <br></br>
        <label>Username</label><br></br>
        <input type='text'
         value={username}
        onChange={this.handleUsernameChange}
        />
        <br></br>
        <label>Password</label><br></br>
        <input type='password'
        value={password}
        onChange={this.handlePasswordChange}
        />
        <br></br>
        <label>Address</label><br></br>
        <input type='text'
         value={address}
        onChange={this.handleAddressChange}
        />
        <br></br>
        <label>Phone</label><br></br>
        <input type='text'
         value={phone}
        onChange={this.handlePhoneChange}
        />

        </div>
        <br></br> 
        <button type="submit" class="registration_btn"><b>Create Account</b></button>
        </form><br/>
       </div>
        )
    }
}

export default Registration