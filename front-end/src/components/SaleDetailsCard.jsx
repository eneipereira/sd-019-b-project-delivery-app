import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { serializeDate, serializePrice } from '../utils';

function SaleDetailsCard() {
  const testId = 'seller_order_details__';
  const { id } = useParams();
  const [saleState, setSaleState] = useState([]);

  useEffect(() => {
    const fetchSale = async () => {
      const response = await fetch(`http://localhost:3001/orders/${id}`);
      const data = await response.json();
      setSaleState(data);
    };
    fetchSale();
  }, [id]);

  return (
    <div>
      {!saleState.length ? <p>Loading...</p>
        : saleState.map((sale) => (
          <div key={ sale.id }>
            <h1 data-testId={ `${testId}element-order-details-label-order-id` }>
              {sale.id}
            </h1>
            <p data-testId={ `${testId}element-order-details-label-order-date` }>
              {serializeDate(sale.saleDate)}
            </p>
            <p data-testid={ `${testId}element-order-details-label-delivery-status` }>
              {sale.status}
            </p>
            <button type="button" data-testid={ `${testId}button-preparing-check` }>
              Preparar Pedido
            </button>
            <button
              type="button"
              disabled
              data-testid={ `${testId}button-dispatch-check` }
            >
              Saiu para Entrega
            </button>
            <div>
              {sale.products.map((item, index) => (
                <div key={ item.id } className="salecard-card">
                  <p data-testid={ `${testId}element-order-table-item-number-${index}` }>
                    {index + 1}
                  </p>
                  <p data-testid={ `${testId}element-order-table-name-${index}` }>
                    {item.name}
                  </p>
                  <p data-testid={ `${testId}element-order-table-quantity-${index}` }>
                    {item.prodQty.quantity}
                  </p>
                  <p data-testid={ `${testId}element-order-table-unit-price-${index}` }>
                    {serializePrice(item.price)}
                  </p>
                  <p data-testid={ `${testId}element-order-table-sub-total-${index}` }>
                    {serializePrice((item.price * item.prodQty.quantity).toFixed(2))}
                  </p>
                </div>
              ))}
            </div>
            <p data-testid={ `${testId}element-order-total-price` }>
              {serializePrice(saleState[0].totalPrice)}
            </p>
          </div>
        ))}
    </div>
  );
}

export default SaleDetailsCard;
