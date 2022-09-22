import React, { useState, useEffect } from 'react';
import Counter from './Counter';
import '../styles/pages/products.css';

function DrinkCard() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setDrinks(data);
      setLoading(false);
    }
    console.log(drinks);
    fetchDrinks();
  }, [drinks]);

  return (
    <div className="drink-container">
      {loading ? <p>Loading...</p> : drinks.map((drink, index) => (
        <div key={ drink.id } className="drink-card">
          <p data-testid={ `${index}-product-price` }>
            {'R$ '}
            {drink.price}
          </p>
          <img
            src={ drink.urlImage }
            alt={ drink.name }
            data-testid={ `${index}-product-img` }
          />
          <p data-testid={ `${index}-product-name` }>{drink.name}</p>
          <Counter />
        </div>
      ))}
    </div>
  );
}

export default DrinkCard;
