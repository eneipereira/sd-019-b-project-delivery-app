import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsContext } from '../context/ProductsContext';

function SaleDetailsCard() {
  const saleDataTestId = 'seller_order_details__element-order-details-label';
  const saleTableTestId = 'seller_order_details__element-order-table';
  const { id } = useParams();
  const { loading } = useProductsContext();
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
      <h1>Detalhe do pedido</h1>
      {loading || !saleState.length ? <p>Loading...</p> : saleState.map((sale) => (
        <div key={ sale.id } className="salecard-card">
          <h1
            data-testid={ `${saleDataTestId}-order-${sale.id}` }
          >
            {sale.id}

          </h1>
          <p
            data-testid={ `${saleDataTestId}-order-date` }
          >
            {new Date(sale.saleDate).toLocaleDateString('pt-BR')}

          </p>
          <p
            data-testid={ `${saleDataTestId}-delivery-status` }
          >
            {sale.status}
          </p>
          <button
            data-testid="seller_order_details__button-preparing-check"
            type="button"
          >
            Preparar pedido

          </button>
          <button
            data-testid="seller_order_details__button-dispatch-check"
            type="button"
          >
            Saiu para entrega

          </button>
          <div>
            {sale.products.map((item) => (
              <div key={ item.id } className="salecard-card">
                <p
                  data-testid={ `${saleTableTestId}-item-number-${item.id}` }
                >
                  {item.id}

                </p>
                <p
                  data-testid={ `${saleTableTestId}-name-${item.id}` }
                >
                  {item.name}

                </p>
                <p
                  data-testid={ `${saleTableTestId}-quantity-${item.id}` }
                >
                  {item.prodQty.quantity}

                </p>
                <p
                  data-testid={ `${saleTableTestId}-unit-price-${item.id}` }
                >
                  {item.price}

                </p>
                <p
                  data-testid={ `${saleTableTestId}-sub-total-${item.id}` }
                >
                  {item.price * item.prodQty.quantity}

                </p>
              </div>
            ))}
          </div>
          <p
            data-testid="seller_order_details__element-order-total-price"
          >
            {saleState[0].totalPrice}

          </p>
        </div>
      ))}
    </div>
  );
}

export default SaleDetailsCard;
