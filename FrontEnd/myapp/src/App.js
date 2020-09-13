import React, {Component} from 'react';
import Login from './components/login/Login';
import Booking from './components/Booking';
import Registration from './components/Registration';
import Business_Contact from './components/Business_Contact';
import NavBar from './components/layout/NavBar';
import Customer_Dashboard from './components/Customer_Dashboard';
import Worker_Dashboard from './components/Worker_Dashboard';
import Admin_Dashboard from './components/Admin_Dashboard' ;


        
import{BrowserRouter,Route,Switch} from 'react-router-dom'

class App extends Component {
  render () {
     return (
      <BrowserRouter>
      <NavBar/> 
      <div className="App">        
      <Switch>
      <Route path='/Admin_Dashboard' component={Admin_Dashboard}/>
      <Route path='/Worker_Dashboard' component={Worker_Dashboard}/>
      <Route path='/Customer_Dashboard' component={Customer_Dashboard}/>
      
      <Route path='/Booking' component={Booking}/>
      <Route path='/Business_Contact' component={Business_Contact}/>
      <Route path='/Registration' component={Registration}/>
       <Route path='/' component={Login} exact/>
      </Switch>
      </div>
      </BrowserRouter>
     )
   }
 
 }

export default App;
