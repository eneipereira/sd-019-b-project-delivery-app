import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/salecard.css';
import delivery from '../images/delivery.png';

const { serializeDate, serializePrice, getLocalStorageParsed } = require('../utils');

function SaleCard() {
  const { id: userInfo } = getLocalStorageParsed('user', {});
  const [sales, setSales] = React.useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const data = await fetch(`http://localhost:3001/orders/seller/${+userInfo}`).then((response) => response.json());
      setSales(data);
    };
    fetchSales();
  }, [userInfo]);

  return (
    <div className="salecard-container">
      {!sales.length ? <p>Você não tem pedidos...</p> : sales.map((sale) => (
        <div key={ sale.id } className="salecard-card">
          <img src={ delivery } alt="delivery" />
          <nav>
            <Link
              style={ { textDecoration: 'none' } }
              to={ `/seller/orders/${sale.id}` }
            >
              <div className="sale-number">
                <h1 data-testid={ `seller_orders__element-order-id-${sale.id}` }>
                  Pedido nº:
                  {' '}
                  {sale.id}
                </h1>
              </div>
              <div className="sale-status">
                <h1
                  data-testid={ `seller_orders__element-delivery-status-${sale.id}` }
                >
                  {sale.status}
                </h1>
              </div>
              <div className="order-details">
                <p data-testid={ `seller_orders__element-order-date-${sale.id}` }>
                  Data do pedido:
                  {' '}
                  {serializeDate(sale.saleDate)}
                </p>
                <p data-testid={ `seller_orders__element-card-price-${sale.id}` }>
                  Valor do pedido:
                  {' '}
                  R$
                  {' '}
                  {serializePrice(sale.totalPrice)}
                </p>
                <p data-testid={ `seller_orders__element-card-address-${sale.id}` }>
                  Endereço de entrega:
                  {' '}
                  {sale.deliveryAddress}
                  {', '}
                  {sale.deliveryNumber}
                </p>
              </div>
            </Link>
          </nav>
        </div>
      ))}
    </div>
  );
}

export default SaleCard;
