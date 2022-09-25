import React, {
  createContext, useContext, useState, useMemo, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { getLocalStorageParsed } from '../utils';

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

  // Pega os dados da API e em seguida verifica se há algum dado no localStorage,
  // se houver, ele faz um map no retorno da API e verifica se o id do item é existente no array do localStorage, se não for, ele retorna o item da API, senão, ele retorna o item do localStorage.
  // Refatorar ****
  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      const cartStorage = getLocalStorageParsed('cart', []);
      const drinksStorage = data.map((drink) => {
        const cartStorageIndex = cartStorage.findIndex((item) => item.id === drink.id);
        if (cartStorageIndex < 0) {
          drink.quantity = 0;
          return drink;
        }
        return cartStorage[cartStorageIndex];
      });
      setDrinks(drinksStorage);
      setLoading(false);
    }
    fetchDrinks();
  }, []);

  const sumTotal = useCallback(() => {
    const storageCart = getLocalStorageParsed('cart', []);
    const totalItems = storageCart.reduce((acc, { subTotal }) => acc + subTotal, 0);
    setTotal(totalItems.toFixed(2).replace('.', ','));
  }, []);

  useEffect(() => sumTotal(), [drinks, sumTotal]);

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
