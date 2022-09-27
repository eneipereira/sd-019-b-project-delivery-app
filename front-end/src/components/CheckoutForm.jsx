import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Select from './Select';
import Input from './Input';
import { useLoginContext } from '../context/LoginContext';
import api, { createSale } from '../services';
import { serializeCreateSale } from '../utils';

function CheckoutForm({ checkouCart, total }) {
  const history = useHistory();
  const { userInfo } = useLoginContext();

  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const getSellers = async () => {
      const response = await api.get('/login/sellers').then((res) => res.data);
      setSellers(response);
    };
    getSellers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token, id } = userInfo;
    const sale = { sellerId, deliveryAddress, deliveryNumber, total, id };
    const newSale = serializeCreateSale(sale, checkouCart);
    const { id: createdSaleId } = await createSale(newSale, token);
    if (createdSaleId) {
      history.push(`/customer/orders/${createdSaleId}`);
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div style={ { display: 'flex', justifyContent: 'space-around' } }>
        <Select
          dataTestId="customer_checkout__select-seller"
          options={ sellers }
          name="sellers"
          selectTitle="P. Vendedora Reponsável:"
          handleChange={ (e) => setSellerId(e.target.value) }
        />
        <Input
          dataTestId="customer_checkout__input-address"
          title="Endereço:"
          type="text"
          name="endereco"
          value={ deliveryAddress }
          handleChange={ (e) => setDeliveryAddress(e.target.value) }
        />
        <Input
          dataTestId="customer_checkout__input-address-number"
          title="Número::"
          type="number"
          name="numero"
          value={ deliveryNumber }
          handleChange={ (e) => setDeliveryNumber(e.target.value) }
        />
      </div>
      <button type="submit" disabled={ !checkouCart.length }>
        <p data-testid="customer_checkout__button-submit-order">FINALIZAR PEDIDO</p>
      </button>
    </form>
  );
}

CheckoutForm.propTypes = {
  checkouCart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
    subTotal: PropTypes.number,
  })).isRequired,
  total: PropTypes.string.isRequired,
};

export default CheckoutForm;
