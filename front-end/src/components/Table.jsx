import React from 'react';
import PropTypes from 'prop-types';

const { serializePrice } = require('../utils');

function Table({ bodies, removeItem }) {
  const dataTestId = 'customer_checkout__element-order-table';
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th style={ { width: '40%' } }>Descrição</th>
          <th>Quantidade</th>
          <th>Valor unitário</th>
          <th>Sub-total</th>
          <th>Remover item</th>
        </tr>
      </thead>
      <tbody align="center">
        {bodies.map((item, index) => (
          <tr key={ item.id } className="cu">
            <td
              data-testid={ `${dataTestId}-item-number-${index}` }
              className="table-body-item"
            >
              {index + 1}
            </td>
            <td
              className="table-body-name"
              data-testid={ `${dataTestId}-name-${index}` }
            >
              {item.name}
            </td>
            <td
              className="table-body-quantity"
              data-testid={ `${dataTestId}-quantity-${index}` }
            >
              {item.quantity}
            </td>
            <td
              className="table-body-unit-price"
              data-testid={ `${dataTestId}-unit-price-${index}` }
            >
              {serializePrice(item.price)}
            </td>
            <td
              className="table-body-sub-total"
              data-testid={ `${dataTestId}-sub-total-${index}` }
            >
              {serializePrice(item.subTotal.toFixed(2))}
            </td>
            <td
              className="table-body-remove-item"
            >
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
  removeItem: PropTypes.func.isRequired,
};

export default Table;
