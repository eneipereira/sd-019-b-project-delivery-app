import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// Cria a context e exporta o uso dela atraves do useContext();
// Para utilizar basta importar 'useLoginContext' e desestruturar da forma tradicional;
// Ex: import { useLoginContext } from '../context/LoginProvider';
// const { email, setEmail } = useLoginContext();

const ProductsContext = createContext();
export const useProductsContext = () => useContext(ProductsContext);

function ProductsProvider({ children }) {
  const [drink, setDrink] = useState('');
  const [priceDrink, setPriceDrink] = useState('');
  const [nameDrink, setNameDrink] = useState('');
  const [counter, setCounter] = useState(0);

  const contextValue = useMemo(() => ({
    drink,
    setDrink,
    priceDrink,
    setPriceDrink,
    nameDrink,
    setNameDrink,
    counter,
    setCounter,
  }), [drink, priceDrink, nameDrink, counter]);

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
