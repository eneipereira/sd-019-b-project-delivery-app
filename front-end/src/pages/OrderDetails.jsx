import React from 'react';
import { useParams } from 'react-router-dom';

function OrderDetails() {
  const { id } = useParams();
  return (
    <div>
      OrderDetails
      <p>
        id:
        {id}
      </p>
    </div>
  );
}

OrderDetails.propTypes = {};

export default OrderDetails;
