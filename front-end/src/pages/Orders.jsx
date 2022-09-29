import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';
import api from '../services';
import { serializeDate, serializePrice } from '../utils';

function Orders() {
  const { userInfo, userOrders, setUserOrders } = useLoginContext();

  useEffect(() => {
    const ordersById = () => {
      api.get(`/orders/user/${userInfo.id}`)
        .then((response) => {
          const { data } = response;
          setUserOrders(data);
        })
        .catch((err) => err.response.data);
    };

    ordersById();
  }, [setUserOrders, userInfo]);

  return (
    userOrders.length === 0 ? 'Você não tem nenhum pedido...'
      : userOrders.map((
        {
          id,
          status,
          saleDate,
          totalPrice,
        },
      ) => (
        <Link to={ `/customer/orders/${id}` } key={ id }>
          <div>
            <h2 data-testid={ `customer_orders__element-order-id-${id}` }>
              {`Pedido ${id}` }
            </h2>
            <h2 data-testid={ `customer_orders__element-delivery-status-${id}` }>
              {status}
            </h2>
            <h2 data-testid={ `customer_orders__element-order-date-${id}` }>
              {serializeDate(saleDate)}
            </h2>
            <h2 data-testid={ `customer_orders__element-card-price-${id}` }>
              {serializePrice(totalPrice)}
            </h2>
          </div>
        </Link>
      ))
  );
}

export default Orders;
