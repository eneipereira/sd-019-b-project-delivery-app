import React, { useState, useEffect } from 'react';
import Counter from './Counter';
import '../styles/pages/products.css';

function AllDrinks() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setDrinks(data);
      setLoading(false);
    }
    // console.log(drinks);
    fetchDrinks();
  }, [drinks]);

  return (
    <div className="drink-container">
      {loading ? <p>Loading...</p> : drinks.map((drink, index) => (
        <div key={ drink.id } className="drink-card">
          <p data-testid={ `customer_products__element-card-price-${drink.id}` }>
            {'R$ '}
            {drink.price}
          </p>
          <img
            src={ drink.urlImage }
            alt={ drink.name }
            data-testid={ `customer_products__img-card-bg-image-${index}` }
          />
          <p
            data-testid={ `customer_products__element-card-title-${index}` }
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

export default AllDrinks;
