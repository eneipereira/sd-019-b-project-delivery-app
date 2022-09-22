import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginProvider from './context/LoginContext';
import Login from './pages/login';

class App extends Component {
  render() {
    return (
      <LoginProvider>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Redirect from="/" to="/login" />
        </Switch>
      </LoginProvider>
    );
  }
}

export default App;
