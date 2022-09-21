import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// Cria a context e exporta o uso dela atraves do useContext();
// Para utilizar basta importar 'useLoginContext' e desestruturar da forma tradicional;
// Ex: import { useLoginContext } from '../context/LoginProvider';
// const { email, setEmail } = useLoginContext();

const LoginContext = createContext();
export const useLoginContext = () => useContext(LoginContext);

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const contextValue = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
  }), [email, password]);

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
