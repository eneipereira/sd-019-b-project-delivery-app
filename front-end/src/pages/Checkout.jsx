import React, { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import Table from '../components/Table';
import { useProductsContext } from '../context/ProductsContext';
import '../styles/pages/checkout.css';

const { getLocalStorageParsed, setLocalStorage } = require('../utils');

function Checkout() {
  const { total, sumTotal } = useProductsContext();
  const cart = getLocalStorageParsed('cart');
  const [checkouCart, setCheckoutCart] = useState(cart);

  const headers = [
    'Item', 'Descrição', 'Quantidade', 'Valor unitário ', 'Sub-total', 'Remover item'];

  const removeItem = (id) => {
    const newCart = checkouCart.filter((item) => item.id !== id);
    setLocalStorage('cart', newCart);
    setCheckoutCart(newCart);
    sumTotal();
  };

  return (
    <section className="main-container">
      <h2>Finalizar Pedido</h2>
      <div className="table-container">
        <Table headers={ headers } bodies={ checkouCart } removeItem={ removeItem } />
        <div className="table-total">
          <h1>
            Total: R$
            {' '}
            <span data-testid="customer_checkout__element-order-total-price">
              {total}
            </span>
          </h1>
        </div>
      </div>
      <h2>Dethalhes e Endereço para Entrega</h2>
      <div className="table-container checkout-main-container">
        <div className="table-container checkout-form-container">
          <CheckoutForm checkouCart={ checkouCart } total={ total } />
        </div>
      </div>

    </section>
  );
}

Checkout.propTypes = {};

export default Checkout;
