import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';
import { createUser } from '../services';

const MIN_LENGTH_PASSWORD = 6;
const MIN_LENGTH_NAME = 12;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function AdmNewUser() {
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
      target.className = 'fail';
      return;
    }
    if (eventName === 'email' && !isEmailValid) {
      setError(`${eventName} must be a valid`);
      target.className = 'fail';
      return;
    }
    setError('');
    target.className = 'success';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createUserData = { name, email, password, role: 'customer' };
    const result = await createUser(createUserData);
    if (result?.data?.message) {
      setError(result.data.message);
    }
    history.push('/admin/manage');
  };

  return (
    <div>
      <h1>Cadastrar novo usuário</h1>
      <div>
        {/* <form> */}
        <form action="" method="post" onSubmit={ handleSubmit }>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="userName"
              name="name"
              placeholder="Nome usuário"
              value={ name }
              onChange={ (e) => {
                setName(e.target.value);
                handleInputValidationError(e, MIN_LENGTH_NAME);
              } }
              data-testid="admin_manage__input-name"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="userEmail"
              name="email"
              placeholder="email@site.com.br"
              value={ email }
              onChange={ (e) => {
                setEmail(e.target.value);
                handleInputValidationError(e);
              } }
              data-testid="admin_manage__input-email"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="userPassword"
              name="password"
              placeholder="**********"
              value={ password }
              onChange={ (e) => {
                setPassword(e.target.value);
                handleInputValidationError(e, MIN_LENGTH_PASSWORD);
              } }
              data-testid="admin_manage__input-password"
            />
          </label>
          Tipo:
          <select
            name="role"
            data-testid="admin_manage__select-role"
          >
            <option value="client">Cliente</option>
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
          </select>
          <button
            disabled={ disabled }
            type="submit"
            data-testid="admin_manage__button-register"
          >
            Cadastrar
          </button>
        </form>
        <p data-testid="common_register__element-invalid_register">{error}</p>
      </div>
    </div>
  );
}

export default AdmNewUser;
