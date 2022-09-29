import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services';
import { serializeDate, serializePrice } from '../utils';

function SaleDetailsCard() {
  const testId = 'seller_order_details__';
  const { id } = useParams();
  const [saleState, setSaleState] = useState([]);
  const [disableBtn1, setDisableBtn1] = useState(true);
  const [disableBtn2, setDisableBtn2] = useState(true);

  useEffect(() => {
    const disableButton = (status) => {
      if (status === 'Pendente') {
        setDisableBtn1(false);
      } else if (status === 'Preparando') {
        setDisableBtn2(false);
      }
    };

    const fetchSale = async () => {
      const response = await fetch(`http://localhost:3001/orders/${id}`);
      const data = await response.json();
      disableButton(data[0].status);
      setSaleState(data);
    };
    fetchSale();
  }, [id]);

  const setOrderStatus = (status) => {
    api.patch(`/orders/${id}`, { status })
      .then()
      .catch((err) => err.response.data);
  };

  return (
    <div>
      {!saleState.length ? <p>Loading...</p>
        : saleState.map((sale) => (
          <div key={ sale.id }>
            <h1 data-testid={ `${testId}element-order-details-label-order-id` }>
              {sale.id}
            </h1>
            <p data-testid={ `${testId}element-order-details-label-order-date` }>
              {serializeDate(sale.saleDate)}
            </p>
            <p data-testid={ `${testId}element-order-details-label-delivery-status` }>
              {sale.status}
            </p>
            <button
              type="button"
              disabled={ disableBtn1 }
              data-testid={ `${testId}button-preparing-check` }
              onClick={ () => setOrderStatus('Preparando') }
            >
              Preparar Pedido
            </button>
            <button
              type="button"
              disabled={ disableBtn2 }
              data-testid={ `${testId}button-dispatch-check` }
              onClick={ () => setOrderStatus('Em Trânsito') }
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
