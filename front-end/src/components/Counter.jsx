import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/counter.css';
import { useProductsContext } from '../context/ProductsContext';
import { setLocalStorage } from '../utils';

function Counter({ drink, drinks }) {
  const { sumTotal } = useProductsContext();
  const [quantity, setQuantity] = useState(drink.quantity);

  useEffect(() => sumTotal, [sumTotal, quantity]);

  const setNewLocalStorage = (newQuantity) => {
    const indexItem = drinks.findIndex((item) => item.id === drink.id);
    // Seta novas chaves para melhorar a manipulação dos dados em outros componentes e páginas
    drink.quantity = newQuantity;
    drink.subTotal = +drink.quantity * +drink.price;
    drinks[indexItem] = drink;
    // Filtra os itens que possuem quantidade maior que 0 e seta no localStorage
    const newCartStorage = drinks.filter((item) => item.quantity > 0);
    setLocalStorage('cart', newCartStorage);
  };

  const decrement = () => {
    setQuantity((prevState) => {
      setNewLocalStorage(prevState - 1);
      return prevState - 1;
    });
  };

  const increment = () => {
    setQuantity((prevState) => {
      setNewLocalStorage(prevState + 1);
      return prevState + 1;
    });
  };

  // TODO: Componentizar e estilizar o botão de incremento, decremento e o input

  return (
    <div className="counter-container">
      <button
        className="counter-button"
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${drink.id}` }
        onClick={ decrement }
        disabled={ quantity < 1 }
      >
        -
      </button>
      <p
        className="counter-number"
        data-testid="counter-value"
      >
        <label htmlFor="quantity">
          <input
            data-testid={ `customer_products__input-card-quantity-${drink.id}` }
            type="number"
            id="quantity"
            name="quantity"
            value={ quantity }
            onChange={ (e) => {
              setQuantity(+e.target.value); setNewLocalStorage(+e.target.value);
            } }
          />
        </label>
      </p>
      <button
        className="counter-button"
        type="button"
        data-testid={ `customer_products__button-card-add-item-${drink.id}` }
        onClick={ increment }
        value={ quantity }
      >
        +
      </button>
    </div>
  );
}

export default Counter;
Counter.propTypes = {
  drink: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.string,
    quantity: PropTypes.number,
    subTotal: PropTypes.number,
  }).isRequired,
  drinks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.string,
    quantity: PropTypes.number,
    subTotal: PropTypes.number,
  })).isRequired,
};
