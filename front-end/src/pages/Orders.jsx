import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';
import api from '../services';

function Orders() {
  const { userInfo, userOrders, setUserOrders } = useLoginContext();

  useEffect(() => {
    const ordersById = () => {
      api.post('/orders', { id: userInfo.id })
        .then((response) => {
          const { data } = response;
          console.log(data);
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
              {saleDate}
            </h2>
            <h2 data-testid={ `customer_orders__element-card-price-${id}` }>
              {totalPrice}
            </h2>
          </div>
        </Link>
      ))
  );
}

export default Orders;
