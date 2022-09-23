import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LoginProvider from './context/LoginContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsProvider from './context/ProductsContext';
import Products from './pages/Products';

class App extends Component {
  render() {
    return (
      <Switch>
        <LoginProvider>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/" component={ Login } />
          {/* <Redirect from="/" to="/login" /> */}
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/register" component={ Register } />
        </LoginProvider>
        <ProductsProvider />
      </Switch>
    );
  }
}

export default App;
