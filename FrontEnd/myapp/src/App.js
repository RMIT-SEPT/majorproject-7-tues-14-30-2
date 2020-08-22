import React, {Component} from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import NavBar from './components/NavBar';
import{BrowserRouter,Route,Switch} from 'react-router-dom'

class App extends Component {
  render () {
     return (
      <BrowserRouter>
      <NavBar/>

      <div className="App">    
             
      <Switch>
       <Route path='/' component={Login} exact/>
       <Route path='/Registration' component={Registration}/>
      </Switch>
      </div>
      </BrowserRouter>
     )
   }
 
 }

export default App;
