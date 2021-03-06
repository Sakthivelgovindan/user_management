import React, { Component } from 'react';
import './App.css';
import CustomNavbar from './components/CustomNavbar';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
     
      <Router>
        <div>

            <CustomNavbar />
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />

        </div>

      </Router>

      
    
    );
  }
}

export default App;
