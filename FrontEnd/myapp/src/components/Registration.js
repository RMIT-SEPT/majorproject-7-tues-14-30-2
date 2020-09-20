import React,{Component} from 'react'
import"./Registration.css";
import axios from 'axios'



class Registration extends Component{
    constructor(props){
        super(props)

    this.state={
        name:'',
        username:'',
        password:'',
        address:'',
        contact:'',
        role:''
            
    }
    this.OnSubmit = this.OnSubmit.bind(this)


    }

    OnSubmit(e){
        
        e.preventDefault();
        const newUser = {
            name:this.state.name,
            username:this.state.username,
            password:this.state.password,
            address:this.state.address,
            contact:this.state.contact,
            role:"Customer"
        }
        if(newUser.name=='' || newUser.username == '' || newUser.password =='' || newUser.address == '' || newUser.contact == ''){
            alert('Please fill in the information');
        }
        console.log(newUser);
      
        axios.post('http://localhost:8080/api/user', newUser);
        this.props.history.push('/')

        alert('Account Created!');
              
    };

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

handleContactChange = (event) =>{
    let phone = event.target.value;
    //only accepts number
    if(!Number(phone)){
        return;
    }
    this.setState({
        contact: phone
    })
}

    render(){
    return(
        <div class="centered">
        <form onSubmit={this.OnSubmit}>

        <div classname="form"> 

        <label>Name</label><br></br>
        <input type='text' value={this.state.name} onChange={this.handleNameChange} required/>
        <br></br>

        <label>Username</label><br></br>
        <input type='text'
         value={this.state.username}
        onChange={this.handleUsernameChange}
        required/>
        <br></br>
        <label>Password</label><br></br>
        <input type='password'
        value={this.state.password}
        onChange={this.handlePasswordChange}
        required/>
        <br></br>
        <label>Address</label><br></br>
        <input type='text'
         value={this.state.address}
        onChange={this.handleAddressChange}
        required/>
        <br></br>
        <label>Phone</label><br></br>
        <input type='text'
         value={this.state.contact}
        onChange={this.handleContactChange}
        required/>

        </div>
        <br></br> 
        <button type="submit" class="registration_btn"><b>Create Account</b></button>
        </form><br/>
       </div>
        )
    }
}

export default Registration