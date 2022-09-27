import React, {
  createContext, useContext, useState, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';

const SalesContext = createContext();
export const useSalesContext = () => useContext(SalesContext);

function SalesProvider({ children }) {
  const [sales, setSales] = useState([]);
  const idUser = JSON.parse(localStorage.getItem('user'));
  console.log(idUser);

  useEffect(() => {
    async function fetchSales() {
      const response = await fetch(`http://localhost:3001/orders/seller/${idUser.id}`);
      const data = await response.json();
      console.log(data);
      setSales(data);
    }
    fetchSales();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(() => ({
    sales,
    setSales,
  }), [sales]);

  return (
    <SalesContext.Provider value={ contextValue }>
      {children}
    </SalesContext.Provider>
  );
}

SalesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SalesProvider;
