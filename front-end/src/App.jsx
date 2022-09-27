import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import './App.css';
import LoginProvider from './context/LoginContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsProvider from './context/ProductsContext';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import Sales from './pages/Sales';
import SalesDetails from './pages/SaleDetails';
import Orders from './pages/Orders';
import OrdersDetails from './pages/OrdersDetails';

function App() {
  const match = useRouteMatch('/');
  return (
    <Switch>
      <ProductsProvider>
        <LoginProvider>
          {match.isExact && <Redirect to="/login" />}
          <Route exact path="/" component={ Login } />
          <Route exact path="/login" component={ Login } />
          <Route path="/customer/" component={ Header } />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/seller/orders" component={ Sales } />
          <Route exact path="/seller/orders/:id" component={ SalesDetails } />
        </LoginProvider>
      </ProductsProvider>
    </Switch>
  );
}

export default App;
