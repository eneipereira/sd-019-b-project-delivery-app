import React from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter';
import '../styles/pages/products.css';

const { serializePrice } = require('../utils');

function DrinkCard({ drink, userCart }) {
  return (
    <div className="drink-card">
      <p data-testid={ `customer_products__element-card-price-${drink.id}` }>
        {serializePrice(drink.price)}
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
        userCart={ userCart }
      />
    </div>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
  userCart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.string,
    quantity: PropTypes.number,
    subTotal: PropTypes.number,
  })).isRequired,
};

export default DrinkCard;
