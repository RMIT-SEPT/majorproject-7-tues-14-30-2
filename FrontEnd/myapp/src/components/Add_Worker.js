import axios from 'axios';
import React, { Component } from 'react'
import"./Add_Worker.css";

class Add_Worker extends Component{
    constructor(props){
        super(props)
    
    this.state={
           name:'',
           username:'',
           password:'',
           address:'',
           phone:''
        }
    this.OnChange=this.OnChange.bind(this);
    this.OnSubmit=this.OnSubmit.bind(this); 
 } 



    OnChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
             }

    OnSubmit(e){
        e.preventDefault();
        axios.post(`http://localhost:8080/api/user`,{
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            address: this.state.password,
            contact: this.state.phone,
            role: "WORKER" 
        })
        .then((res) => {
            console.log(res)
            alert("A worker account has been created");
        })
        .catch((err) =>{
            alert("A worker account has not been created");
        })           
    }      
             
render(){
return(
    <div className="centered">
    <h2>Create a Worker</h2> 
    <form onSubmit={this.OnSubmit}>

    <label>Username</label><br></br>
        <input type='username'
        name="username"
        value={this.state.username}
        onChange={this.OnChange} required
        />

         <br></br>
        <label>Name</label><br></br>
        <input type='text'
        name="name"
         value={this.state.name}
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
        <label>Address</label><br></br>
        <input type='text'
        name="address"
        value={this.state.address}
        onChange={this.OnChange} required
        />

         <br></br>
        <label>Phone Number</label><br></br>
        <input type='text'
        name="phone"
        value={this.state.phone}
        onChange={this.OnChange} required pattern="[0-9]*"
        />
    <br></br>
    <br></br>
    <button type="submit" className="create_btn"><b>Create</b></button>
    </form>
    <br></br>
    </div>
          )
    }
}

export default Add_Worker