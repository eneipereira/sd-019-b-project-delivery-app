import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AllDrinks from '../components/AllDrinks';
import '../styles/pages/products.css';

// const addCart = () => {
//   const cart = JSON.parse(localStorage.getItem('cart')) || [];
//   const drink = {
//     id:

function Produtos() {
  return (
    <div>
      <Header />
      <AllDrinks />
      <div>
        <Link to="/checkout">
          <button
            className="products-cart-btn"
            type="button"
          >
            Ver carrinho:
            {' '}
            R$
            {' '}
            {0}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Produtos;
