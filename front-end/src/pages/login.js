import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoginContext } from '../context/LoginContext';

function Login() {
  const { email, setEmail, password, setPassword } = useLoginContext();
  const [disabled, setDisable] = useState(true);

  useEffect(() => {
    const checkEmailAndPassword = () => {
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const validEmail = regex.test(email);
      const passwordLength = 6;
      const validPassword = password.length >= passwordLength;
      if (validEmail && validPassword) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    };

    checkEmailAndPassword();
  }, [email, password]);

  return (
    <div>
      <form method="post">
        <label htmlFor="email-input">
          Email
          <input
            type="email"
            id="email-input"
            data-testid="common_login__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            type="password"
            id="password-input"
            data-testid="common_login__input-password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="common_login__button-login"
          onSubmit={ () => axios.post('/login', { email, password }) }
          disabled={ disabled }
        >
          Login
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
      </form>
    </div>

  );
}

export default Login;
