import React, {
  createContext, useContext, useState, useMemo, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';

const { getLocalStorageParsed, serializePrice } = require('../utils');

// Cria a context e exporta o uso dela atraves do useContext();
// Para utilizar basta importar 'useLoginContext' e desestruturar da forma tradicional;
// Ex: import { useLoginContext } from '../context/LoginProvider';
// const { email, setEmail } = useLoginContext();

const ProductsContext = createContext();
export const useProductsContext = () => useContext(ProductsContext);

function ProductsProvider({ children }) {
  const [total, setTotal] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Seta os dados iniciais que retornam da API
  // Refatorar ****
  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setDrinks(data);
      setLoading(false);
    }
    fetchDrinks();
  }, []);

  const sumTotal = useCallback(() => {
    const storageCart = getLocalStorageParsed('cart', []);
    const totalItems = storageCart.reduce((acc, { subTotal }) => acc + subTotal, 0);
    setTotal(serializePrice(totalItems.toFixed(2)));
  }, []);

  useEffect(() => sumTotal(), [drinks, sumTotal, total]);

  const contextValue = useMemo(() => ({
    drinks,
    total,
    loading,
    setDrinks,
    setTotal,
    setLoading,
    sumTotal,
  }), [drinks, loading, total, sumTotal]);

  return (
    <ProductsContext.Provider value={ contextValue }>
      {children}
    </ProductsContext.Provider>
  );
}

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductsProvider;
