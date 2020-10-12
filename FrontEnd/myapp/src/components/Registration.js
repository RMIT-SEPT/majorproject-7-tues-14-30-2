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
            role:"CUSTOMER"
        }
        if(newUser.name==='' || newUser.username === '' || newUser.password ==='' || newUser.address === '' || newUser.contact === ''){
            alert('Please fill in the information');
        }
        else if(newUser.contact.length < 10){
            alert('Phone length must be 10')
        }
        else{
            axios.post('http://localhost:8080/api/user', newUser);
            this.props.history.push('/')
            alert('Account Created!');
        }
   
        console.log(newUser);
        

        
              
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

    if(event.target.value.match("^[0-9]*$") != null){
        this.setState(
            {contact:phone}
        );
    }
}

    render(){
    return(
        <div class="centered">
        <form onSubmit={this.OnSubmit}>

        <div classname="form"> 

        <label>Name</label><br></br>
        <input type='text' value={this.state.name} onChange={this.handleNameChange}/>
        <br></br>

        <label>Username</label><br></br>
        <input type='text'
         value={this.state.username}
        onChange={this.handleUsernameChange}
        />
        <br></br>
        <label>Password</label><br></br>
        <input type='password'
        value={this.state.password}
        onChange={this.handlePasswordChange}
        />
        <br></br>
        <label>Address</label><br></br>
        <input type='text'
         value={this.state.address}
        onChange={this.handleAddressChange}
        />
        <br></br>
        <label>Phone</label><br></br>
        <input type='text'
         value={this.state.contact}
        onChange={this.handleContactChange}
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