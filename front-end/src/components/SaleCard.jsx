import React from 'react';
// import { Link } from 'react-router-dom';
import '../styles/components/salecard.css';
import { useSalesContext } from '../context/SalesContext';

function SaleCard() {
  const { sales } = useSalesContext();
  console.log(typeof sales);
  const id = 1;

  return (
    <div className="salecard-container">
      { sales.map((sale, index) => (
        <div key={ index } className="salecard-box">
          <nav>
            <a href={ `http://localhost:3001/orders//seller/${sale.id}` }>
              <div className="sale-number">
                <h1 data-testid={ `seller_orders__element-order-id-${id}` }>
                  Pedido
                  {sale.id}
                </h1>
              </div>
              <div className="sale-status">
                <h1
                  data-testid={ `seller_orders__element-delivery-status-${id}` }
                >
                  {sale.status}
                </h1>
              </div>
              <div className="order-details">
                <p data-testid={ `seller_orders__element-order-date-${id}` }>
                  {new Date(sale.saleDate).toLocaleDateString('pt-BR')}
                </p>
                <p data-testid={ `seller_orders__element-card-price-${id}` }>
                  {sale.totalPrice}
                </p>
              </div>
              <p data-testid={ `seller_orders__element-card-address-${id}` }>
                {sale.deliveryAddress}
                {', '}
                {sale.deliveryNumber}
              </p>
            </a>
          </nav>
        </div>
      ))}
    </div>
  );
}

export default SaleCard;
