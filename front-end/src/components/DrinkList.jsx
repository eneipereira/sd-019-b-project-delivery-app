import React, { useEffect, useState } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import '../styles/pages/products.css';
import { getLocalStorageParsed } from '../utils';
import Counter from './Counter';

function DrinkList() {
  const [drinkList, setDrinkList] = useState([]);
  const { drinks, loading } = useProductsContext();
  useEffect(() => {
    const cartStorage = getLocalStorageParsed('cart', []);
    const drinksStorage = !loading && drinks.map((drink) => {
      const cartStorageIndex = cartStorage.findIndex((item) => item.id === drink.id);
      if (cartStorageIndex < 0) {
        drink.quantity = 0;
        return drink;
      }
      return cartStorage[cartStorageIndex];
    });
    setDrinkList(drinksStorage);
  }, [drinks, loading]);
  return (
    <div className="drink-container">
      {loading || !drinkList.length ? <p>Loading...</p> : drinkList.map((drink) => (
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
            drinks={ drinkList }
          />
        </div>
      ))}
    </div>
  );
}

export default DrinkList;
