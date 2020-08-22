import React, {Component} from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import Business_Contact from './components/Business_Contact';
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
       <Route path='/' component={Login} exact/>
      </Switch>
      </div>
      </BrowserRouter>
     )
   }
 
 }

export default App;
