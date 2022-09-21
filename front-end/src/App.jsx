import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LoginProvider from './context/LoginContext';
import Register from './pages/Register';

class App extends Component {
  render() {
    return (
      <LoginProvider>
        <Switch>
          {/* <Route exact path="/login" component={ Login } /> */}
          {/* <Redirect from="/" to="/login" /> */}
          <Route exact path="/register" component={ Register } />
        </Switch>
      </LoginProvider>
    );
  }
}

export default App;
