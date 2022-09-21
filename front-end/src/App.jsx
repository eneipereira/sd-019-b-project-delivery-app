import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
// import LoginProvider from './context/LoginContext';
// import Register from './pages/Register';
import ProductsProvider from './context/ProductsContext';
import Products from './pages/Products';

class App extends Component {
  render() {
    return (
      <ProductsProvider>
        <Switch>
          {/* <Route exact path="/login" component={ Login } /> */}
          {/* <Redirect from="/" to="/login" /> */}
          {/* <Route exact path="/register" component={ Register } /> */}
          <Route exact path="/products" component={ Products } />
        </Switch>
      </ProductsProvider>
    );
  }
}

export default App;
