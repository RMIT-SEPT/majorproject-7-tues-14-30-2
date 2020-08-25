import React, {Component} from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import Business_Contact from './components/Business_Contact';
import Worker_Dashboard from './components/Worker_Dashboard';
import Customer_Dashboard from './components/Customer_Dashboard';
import Admin_Dashboard from './components/Admin_Dashboard';
import Booking from './components/Booking';
import NavBar from './components/NavBar';
import{BrowserRouter,Route,Switch} from 'react-router-dom'

class App extends Component {
  render () {
     return (
      <BrowserRouter>
      <NavBar/>

      <div className="App">    
             
      <Switch>
      <Route path='/Business_Contact' component={Business_Contact}/>
      <Route path='/Registration' component={Registration}/>
      <Route path='/Customer_Dashboard' component={Customer_Dashboard}/>
      <Route path='/Admin_Dashboard' component={Admin_Dashboard}/>
      <Route path='/Worker_Dashboard' component={Worker_Dashboard}/>
      <Route path='/Booking' component={Booking}/>
       <Route path='/' component={Login} exact/>
      </Switch>
      </div>
      </BrowserRouter>
     )
   }
 
 }

export default App;
