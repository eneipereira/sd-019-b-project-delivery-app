import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';
import api from '../services';
import { serializeDate, serializePrice } from '../utils';

function OrdersDetails() {
  const { userOrders, setUserOrders } = useLoginContext();
  const [sellers, setSellers] = useState({});
  const [disable, setDisable] = useState(true);
  const { id } = useParams();
  const testIdsTable = 'customer_order_details__element-order-table';
  const testIdStatus = 'customer_order_details__element-order';

  useEffect(() => {
    const getSellersById = (idSeller) => {
      api.get(`/login/sellers/${idSeller}`)
        .then((response) => {
          const { data } = response;
          setSellers(data);
        })
        .catch((err) => err.response.data);
    };

    const disableButton = (status) => {
      if (status === 'Em trânsito' || status === 'Entregue') {
        setDisable(false);
      }
    };

    const ordersById = () => {
      api.get(`/orders/${id}`)
        .then((response) => {
          const { data } = response;
          disableButton(data[0].status);
          getSellersById(data[0].sellerId);
          setUserOrders(data);
        })
        .catch((err) => err.response.data);
    };

    ordersById();
  }, [id, setUserOrders]);

  return (
    <section>
      <h2>Detalhe do pedido</h2>
      <div>
        <h4 data-testid="customer_order_details__element-order-details-label-order-id">
          {`Pedido ${id};`}
        </h4>
        <h4
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { userOrders.length === 0 && !sellers
            ? ''
            : `P. Vend: ${sellers.name}`}
        </h4>
        <h4
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { userOrders.length === 0
            ? ''
            : serializeDate(userOrders[0].saleDate)}
        </h4>
        <h4
          data-testid={ `${testIdStatus}-details-label-delivery-status` }
        >
          { userOrders.length === 0 ? '' : userOrders[0].status}
        </h4>
        <button
          type="button"
          disabled={ disable }
          data-testid="customer_order_details__button-delivery-check"
        >
          Marcar como entregue
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
          </tr>
        </thead>
        <tbody>
          {
            userOrders.length === 0
              ? ''
              : userOrders[0].products.map(
                ({ id: prodId, name, prodQty, price }, index) => (
                  <tr key={ prodId }>
                    <td
                      data-testid={ `${testIdsTable}-item-number-${index + 1}` }
                    >
                      {index + 1}
                    </td>
                    <td
                      data-testid={ `${testIdsTable}-name-${index + 1}` }
                    >
                      {name}
                    </td>
                    <td
                      data-testid={ `${testIdsTable}-quantity-${index + 1}` }
                    >
                      {prodQty.quantity}
                    </td>
                    <td
                      data-testid={ `${testIdsTable}-unit-price-${index + 1}` }
                    >
                      {serializePrice(price)}
                    </td>
                    <td
                      data-testid={ `${testIdsTable}-sub-total-${index + 1}` }
                    >
                      {serializePrice((prodQty.quantity * price).toFixed(2))}
                    </td>
                  </tr>
                ),
              )
          }
        </tbody>
      </table>
      <div
        data-testid="customer_order_details__element-order-total-price"
      >
        { userOrders.length === 0
          ? ''
          : `${serializePrice(userOrders[0].totalPrice)}` }
      </div>
    </section>
  );
}

export default OrdersDetails;
