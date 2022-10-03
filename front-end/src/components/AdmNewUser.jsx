import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { createUserByAdmPage } from '../services';
import { getLocalStorageParsed } from '../utils';

const MIN_LENGTH_PASSWORD = 6;
const MIN_LENGTH_NAME = 12;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function AdmNewUser() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  // const history = useHistory();
  const [roleSelect, setRoleSelect] = useState('customer');
  const typeRole = [
    { type: 'customer' },
    { type: 'administrator' },
    { type: 'seller' },
  ];

  useEffect(() => {
    const handleDisableButton = () => {
      const isPasswordLengthValid = newUser.password.length >= MIN_LENGTH_PASSWORD;
      const isNameLengthValid = newUser.name.length >= MIN_LENGTH_NAME;
      const isEmailValid = emailRegex.test(newUser.email);
      if (isPasswordLengthValid && isEmailValid && isNameLengthValid) {
        setDisabled(false);
        return;
      }
      setDisabled(true);
    };
    handleDisableButton();
  }, [newUser]);

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
    const { token } = getLocalStorageParsed('user');
    const createUserData = {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: roleSelect,
    };
    const result = await createUserByAdmPage(createUserData, token);
    if (result?.data?.message) {
      setError(result.data.message);
      return;
    }
    // history.push('/admin/manage');
    window.location.reload();
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
              value={ newUser.name }
              onChange={ (e) => {
                setNewUser({ ...newUser, name: e.target.value });
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
              value={ newUser.email }
              onChange={ (e) => {
                setNewUser({ ...newUser, email: e.target.value });
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
              value={ newUser.password }
              onChange={ (e) => {
                setNewUser({ ...newUser, password: e.target.value });
                handleInputValidationError(e, MIN_LENGTH_PASSWORD);
              } }
              data-testid="admin_manage__input-password"
            />
          </label>
          Tipo:
          <select
            value={ roleSelect }
            onChange={ (e) => setRoleSelect(e.target.value) }
            data-testid="admin_manage__select-role"
          >
            {typeRole.map((item, index) => (
              <option key={ index } value={ item.type }>
                {item.type}
              </option>
            ))}
          </select>
          <button
            disabled={ disabled }
            type="submit"
            data-testid="admin_manage__button-register"
          >
            Cadastrar
          </button>
        </form>
        <p data-testid="admin_manage__element-invalid-register">{error}</p>
      </div>
    </div>
  );
}

export default AdmNewUser;
