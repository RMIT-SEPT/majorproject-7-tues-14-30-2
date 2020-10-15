import React, { Component } from 'react'
import"./Home.css";
import axios from 'axios';
import welcome from "./welcome.JPG";


class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            isDataFetched: false, //controls when the page renders
            currServices: [{}],
            headings: [{Current_Services: ''}]   
        };
    
      }

    // Refreshes page on logout to ensure navbar is displaying correct links
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
    
    componentDidMount() {   
        const role = 'WORKER'; 
        axios.get(`http://ec2-54-208-156-197.compute-1.amazonaws.com:8080/api/user/getRole/${role}`) // returns all users with role 'WORKER'
            .then((response) => {
                const employee = response.data.map(({username}) => username); // adds all usernames of workers into an array
                var i;
                var j =0;  
               let urlArray = [];
               
               for(i=0; i < employee.length; i++) {
                urlArray[i] = `http://ec2-54-208-156-197.compute-1.amazonaws.com:8080/api/services/findService/${employee[i]}`; // adds GET URL for each worker into an array
                }
                 
               let promiseArray = urlArray.map(url => axios.get(url)); 
                axios.all(promiseArray) // performs the GET request(s)
                .then(results => {
                    let newResults = [];
                    for(i=0; i < results.length; i++) {
                        if(results[i].data[0] !== undefined) {
                            newResults[j] = results[i];
                            j++;
                        }
                    }
                    this.setState({currServices : newResults.map(r => r.data)[0]}); // adds results into services array
                    // console.log("services", this.state.currServices)
                    this.setState({isDataFetched : true})
                })
                .catch(err => {
                    if (err.response) {
                        console.log(err)
                    } else if (err.request) {
                        console.log(err)
                    } else {
                        console.log(err)
                    }
                })    
        })
                        
    }

    
    // maps the data from the request into a table
    renderTableData() {
        return this.state.currServices.map((schedule) => {
            const { service } = schedule
            return (
                <tr>
                    <td>{service}</td>
                </tr>
            )    
        })
    }
    
    // Creates table header and replaces _ with " "
    renderTableHeader() {
        let header = Object.keys(this.state.headings[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase().replace("_", " ")}</th>
        })
    }


     render() {
        if(!this.state.isDataFetched) return null; // Stops page from rendering if data is not fetched 
        return (
           <div classname='home'>
              <img src={welcome} alt="welcome image" height={280} width={1200}/>
              <h2 id='title'>Login or sign up to book a service</h2>
              <table id='currServices'> 
                 <tbody>
                  <tr>{this.renderTableHeader()}</tr>   
                  {this.renderTableData()}
                 </tbody>
              </table>
              <br></br>
           </div>           
        )
     }

   }

export default Home