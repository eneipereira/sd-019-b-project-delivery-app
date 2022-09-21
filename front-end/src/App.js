import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Redirect from="/" to="/login" />
      </Switch>
    );
  }
}

export default App;
