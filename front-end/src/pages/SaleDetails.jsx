import React from 'react';
import HeaderSeller from '../components/HeaderSeller';
import SaleDetailsCard from '../components/SaleDetailsCard';

function SalesDetails() {
  return (
    <div>
      <HeaderSeller />
      <h1> Detalhes do pedido</h1>
      <SaleDetailsCard />
    </div>
  );
}

export default SalesDetails;
