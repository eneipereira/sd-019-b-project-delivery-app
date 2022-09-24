import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LoginProvider from './context/LoginContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsProvider from './context/ProductsContext';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <Switch>
        <ProductsProvider>
          <LoginProvider>
            <Route exact path="/" component={ Login } />
            <Route exact path="/login" component={ Login } />
            <Route path="/customer/" component={ Header } />
            <Route exact path="/customer/products" component={ Products } />
            <Route exact path="/customer/checkout" component={ Checkout } />
            <Route exact path="/register" component={ Register } />
          </LoginProvider>
        </ProductsProvider>
      </Switch>
    );
  }
}

export default App;
