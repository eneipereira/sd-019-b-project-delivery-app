import React, {
  createContext, useContext, useState, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
// import { getLocalStorageParsed } from '../utils';
// import { useLoginContext } from './LoginContext';

// Cria a context e exporta o uso dela atraves do useContext();
// Para utilizar basta importar 'useLoginContext' e desestruturar da forma tradicional;
// Ex: import { useLoginContext } from '../context/LoginProvider';
// const { email, setEmail } = useLoginContext();

const SalesContext = createContext();
export const useSalesContext = () => useContext(SalesContext);

function SalesProvider({ children }) {
  const [sales, setSales] = useState([]);
  const idUser = JSON.parse(localStorage.getItem('user')).id;
  // const { userInfo } = useLoginContext();

  useEffect(() => {
    async function fetchSales() {
      const response = await fetch(`http://localhost:3001/orders/seller/${idUser}`);
      const data = await response.json();
      setSales(data);
    }
    fetchSales();
  }, []);

  const contextValue = useMemo(() => ({
    sales,
    setSales,
  }), [sales, setSales]);

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
