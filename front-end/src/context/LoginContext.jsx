import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useProductsContext } from './ProductsContext';

// Cria a context e exporta o uso dela atraves do useContext();
// Para utilizar basta importar 'useLoginContext' e desestruturar da forma tradicional;
// Ex: import { useLoginContext } from '../context/LoginProvider';
// const { email, setEmail } = useLoginContext();

const LoginContext = createContext();
export const useLoginContext = () => useContext(LoginContext);

function LoginProvider({ children }) {
  const { setTotal } = useProductsContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userInfo, setUserInfo] = useState({});

  // Faz o reset do localStorage e dos estados do login ao clicar no botão de logout
  const handleLogout = useCallback(() => {
    localStorage.clear();
    setTotal(0);
    setEmail('');
    setPassword('');
    setUserInfo({});
  }, [setTotal]);

  const contextValue = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    userInfo,
    setUserInfo,
    handleLogout,
  }), [email, password, name, userInfo, handleLogout]);

  return (
    <LoginContext.Provider value={ contextValue }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
