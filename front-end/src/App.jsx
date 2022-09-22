import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginProvider from './context/LoginContext';
import login from './pages/login';
// import Register from './pages/Register';
import ProductsProvider from './context/ProductsContext';
import Products from './pages/Products';

class App extends Component {
  render() {
    return (
      <Switch>
        <LoginProvider>
          <Route exact path="/login" component={ login } />
          <Route exact path="/customer/products" component={ Products } />
        </LoginProvider>
        <ProductsProvider />
        {/* <Route exact path="/register" component={ Register } /> */}
        <Redirect from="/" to="/login" />
      </Switch>
    );
  }
}

export default App;
