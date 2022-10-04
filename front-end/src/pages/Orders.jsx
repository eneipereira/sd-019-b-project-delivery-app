import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';
import api from '../services';
import delivery from '../images/delivery.png';
import '../styles/pages/orders.css';

const { serializeDate, serializePrice } = require('../utils');

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
    <div className="orders-container">
      {
        userOrders.length === 0 ? 'Você não tem nenhum pedido...'
          : userOrders.map((
            {
              id,
              status,
              saleDate,
              totalPrice,
            },
          ) => (
            <div className="orders-box" key={ id }>
              <img src={ delivery } alt="delivery" />
              <nav>
                <Link
                  to={ `/customer/orders/${id}` }
                  key={ id }
                  style={ { textDecoration: 'none' } }
                >
                  <h2
                    className="orders-box-title"
                    data-testid={ `customer_orders__element-order-id-${id}` }
                  >
                    {`Pedido nº: ${id}` }
                  </h2>
                  <div className="orders-box-status">
                    <h2
                      data-testid={ `customer_orders__element-delivery-status-${id}` }
                    >
                      {status}
                    </h2>
                  </div>
                  <div className="orders-box-details">
                    <h2 data-testid={ `customer_orders__element-order-date-${id}` }>
                      {`Data do pedido: ${serializeDate(saleDate)}` }
                    </h2>
                    <h2 data-testid={ `customer_orders__element-card-price-${id}` }>
                      {`Valor do pedido: R$ ${serializePrice(totalPrice)}` }
                    </h2>
                  </div>
                </Link>
              </nav>
            </div>
          ))
      }
    </div>
  );
}

export default Orders;
