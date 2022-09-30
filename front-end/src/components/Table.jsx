import React from 'react';
import PropTypes from 'prop-types';

const { serializePrice } = require('../utils');

function Table({ headers, bodies, removeItem }) {
  const dataTestId = 'customer_checkout__element-order-table';
  return (
    <table width="100%">
      <thead style={ { width: '100%' } }>
        <tr>
          {headers.map((item) => (
            <th key={ item }>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody align="center">
        {bodies.map((item, index) => (
          <tr key={ item.id }>
            <td data-testid={ `${dataTestId}-item-number-${index}` }>
              {index + 1}
            </td>
            <td data-testid={ `${dataTestId}-name-${index}` }>
              {item.name}
            </td>
            <td data-testid={ `${dataTestId}-quantity-${index}` }>
              {item.quantity}
            </td>
            <td data-testid={ `${dataTestId}-unit-price-${index}` }>
              {serializePrice(item.price)}
            </td>
            <td data-testid={ `${dataTestId}-sub-total-${index}` }>
              {serializePrice(item.subTotal.toFixed(2))}
            </td>
            <td>
              <button
                type="button"
                onClick={ () => removeItem(item.id) }
              >
                <span data-testid={ `${dataTestId}-remove-${index}` }>
                  Remover
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  bodies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
    subTotal: PropTypes.number,
  })).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default Table;
