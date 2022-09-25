import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DrinkList from '../components/DrinkList';
import { useProductsContext } from '../context/ProductsContext';
import '../styles/pages/products.css';

function Produtos() {
  const { total, sumTotal } = useProductsContext();

  useEffect(() => sumTotal, [sumTotal]);

  return (
    <div>
      <DrinkList />
      <div>
        <Link to="/customer/checkout">
          <button
            disabled={ total === '0,00' }
            className="buttonCart"
            data-testid="customer_products__button-cart"
            type="button"
          >
            <p data-testid="customer_products__checkout-bottom-value">
              {total}
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Produtos;
