import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/salecard.css';
import { useLoginContext } from '../context/LoginContext';

function SaleCard() {
  const id = 1;
  const { userInfo } = useLoginContext();
  // const [sales, setSales] = React.useState([]);
  console.log(userInfo);

  // useEffect(() => {
  //   async function fetchDrinks() {
  //     const response = await fetch(`http://localhost:3001/orders/seller/${id}`);
  //     const data = await response.json();
  //     setDrinks(data);
  //     setLoading(false);
  //   }
  //   fetchDrinks();
  // }, [userInfo]);

  return (
    <div className="salecard-container">
      <nav>
        <Link
          to={ `/seller/orders/${id}` }
        >
          <div className="sale-number">
            <h1 data-testid={ `seller_orders__element-order-id-${id}` }>
              Pedido 0001
            </h1>
          </div>
          <div className="sale-status">
            <h1
              data-testid={ `seller_orders__element-delivery-status-${id}` }
            >
              Pendente
              {/* carregar estado do pedidos (status) */}
            </h1>
          </div>
          <div className="order-details">
            <p data-testid={ `seller_orders__element-order-date-${id}` }>
              Data do Pedido
            </p>
            <p data-testid={ `seller_orders__element-card-price-${id}` }>
              Valor do Pedido
            </p>
          </div>
          <p data-testid={ `seller_orders__element-card-address-${id}` }>
            Endereço do cliente
          </p>
        </Link>
      </nav>
    </div>
  );
}

export default SaleCard;
