import React, { useEffect, useState } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import '../styles/pages/products.css';
import { getLocalStorageParsed } from '../utils';
import DrinkCard from './DrinkCard';

function DrinkList() {
  const [userCart, setUserCart] = useState([]);
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
    setUserCart(drinksStorage);
  }, [drinks, loading]);
  return (
    <div className="drink-container">
      {
        loading || !userCart.length
          ? <p>Loading...</p>
          : userCart.map((drink) => (
            <DrinkCard key={ drink.id } drink={ drink } userCart={ userCart } />
          ))
      }
    </div>
  );
}

export default DrinkList;
