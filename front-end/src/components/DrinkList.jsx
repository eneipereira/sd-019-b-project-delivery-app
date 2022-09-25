import React from 'react';
import { useProductsContext } from '../context/ProductsContext';
import '../styles/pages/products.css';
import Counter from './Counter';

function DrinkList() {
  const { drinks, loading } = useProductsContext();
  return (
    <div className="drink-container">
      {loading ? <p>Loading...</p> : drinks.map((drink) => (
        <div key={ drink.id } className="drink-card">
          <p data-testid={ `customer_products__element-card-price-${drink.id}` }>
            {drink.price.toString().replace('.', ',')}
          </p>
          <img
            src={ drink.urlImage }
            alt={ drink.name }
            data-testid={ `customer_products__img-card-bg-image-${drink.id}` }
          />
          <p
            data-testid={ `customer_products__element-card-title-${drink.id}` }
          >
            {drink.name}
          </p>
          <Counter
            drink={ drink }
          />
        </div>
      ))}
    </div>
  );
}

export default DrinkList;
