import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';
import { createUser } from '../services';
import logo from '../images/logo.png';

const { setLocalStorage } = require('../utils');

const MIN_LENGTH_PASSWORD = 6;
const MIN_LENGTH_NAME = 12;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function Register() {
  const { name, email, password, setName, setEmail, setPassword } = useLoginContext();
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const handleDisableButton = () => {
      const isPasswordLengthValid = password.length >= MIN_LENGTH_PASSWORD;
      const isNameLengthValid = name.length >= MIN_LENGTH_NAME;
      const isEmailValid = emailRegex.test(email);
      if (isPasswordLengthValid && isEmailValid && isNameLengthValid) {
        setDisabled(false);
        return;
      }
      setDisabled(true);
    };
    handleDisableButton();
  }, [email, name, password]);

  const handleInputValidationError = ({ target }, minLength) => {
    const { value, name: eventName } = target;
    const isEmailOrPasswordLengthValid = value.length < minLength;
    const isEmailValid = emailRegex.test(value);
    if (minLength && isEmailOrPasswordLengthValid) {
      setError(`${eventName} must be at least ${minLength}`);
      return;
    }
    if (eventName === 'email' && !isEmailValid) {
      setError(`${eventName} must be a valid`);
      return;
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createUserData = { name, email, password, role: 'customer' };
    const result = await createUser(createUserData);
    if (result?.data?.message) {
      setError(result.data.message);
      return;
    }
    const userData = { name, email, role: 'customer', token: result.token };
    setLocalStorage('user', userData);
    history.push('/customer/products');
  };

  return (
    <div className="form-container">
      <img src={ logo } alt="trybeer" width={ 200 } />
      <h1>Cadastro</h1>

      <form action="" method="post" onSubmit={ handleSubmit } className="form-main">
        <section>
          <label htmlFor="userName">
            <p>Nome</p>
            <input
              className="input-register"
              data-testid="common_register__input-name"
              type="text"
              id="userName"
              name="name"
              placeholder="Seu nome"
              value={ name }
              onChange={ (e) => {
                setName(e.target.value);
                handleInputValidationError(e, MIN_LENGTH_NAME);
              } }
            />
          </label>
          <label htmlFor="userEmail">
            <p>Email</p>
            <input
              className="input-register"
              data-testid="common_register__input-email"
              type="email"
              id="userEmail"
              name="email"
              placeholder="seu-email@site.com.br"
              value={ email }
              onChange={ (e) => {
                setEmail(e.target.value);
                handleInputValidationError(e);
              } }
            />
          </label>
          <label htmlFor="userPassword">
            <p>Senha</p>
            <input
              className="input-register"
              data-testid="common_register__input-password"
              type="password"
              id="userPassword"
              name="password"
              placeholder="**********"
              value={ password }
              onChange={ (e) => {
                setPassword(e.target.value);
                handleInputValidationError(e, MIN_LENGTH_PASSWORD);
              } }
            />
          </label>
          <button
            className="input login-button"
            data-testid="common_register__button-register"
            disabled={ disabled }
            type="submit"
          >
            CADASTRAR
          </button>
        </section>
      </form>
      <p data-testid="common_register__element-invalid_register">{error}</p>
    </div>
  );
}

// Register.propTypes = {
//   props: PropTypes.
// };

export default Register;
