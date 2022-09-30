import React, { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import Table from '../components/Table';
import { useProductsContext } from '../context/ProductsContext';

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
    <section>
      <div>
        <p>Finalizar Pedido</p>
        <Table headers={ headers } bodies={ checkouCart } removeItem={ removeItem } />
        <div style={ { width: '100%', textAlign: 'end' } }>
          <h1>
            Total R$
            <span data-testid="customer_checkout__element-order-total-price">
              {total}
            </span>
          </h1>
        </div>
      </div>

      <div>
        <p>Dethalhes e Endereço para Entrega</p>
        <CheckoutForm checkouCart={ checkouCart } total={ total } />
      </div>

    </section>
  );
}

Checkout.propTypes = {};

export default Checkout;
