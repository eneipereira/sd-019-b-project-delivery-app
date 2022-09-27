import React from 'react';
import { useParams } from 'react-router-dom';
// import { useLoginContext } from '../context/LoginContext';

function OrdersDetails() {
  const { id } = useParams();
  const testId = '__element-order-details-label-delivery-status<index>';

  return (
    <section>
      <h2>Detalhe do pedido</h2>
      <div>
        <div>
          <h4 data-testid="customer_order_details__element-order-details-label-order-id">
            {`Pedido ${id};`}
          </h4>
          <h4
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            P. vend:
          </h4>
          <h4
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            Data
          </h4>
          <h4
            data-testid={ `customer_order_details${testId}` }
          >
            StatusOrder
          </h4>
        </div>
        <div>{}</div>
      </div>
    </section>
  );
}

export default OrdersDetails;
