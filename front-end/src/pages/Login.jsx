import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';
import api from '../services';
import logo from '../images/logo.png';
import '../styles/pages/login.css';

function Login() {
  const {
    email, setEmail, password, setPassword, setUserInfo } = useLoginContext();
  const [disabled, setDisable] = useState(true);
  const [error, setError] = useState({});
  const history = useHistory();

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

  useEffect(() => {
    const checkLogin = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.role === 'customer') {
        history.push('/customer/products');
      }
      if (user?.role === 'seller') {
        history.push('/seller/orders');
      }
    };
    checkLogin();
  }, [history]);

  const loginPost = (e) => {
    e.preventDefault();
    api.post('/login', { email, password })
      .then((response) => {
        const { data } = response;
        const result = JSON.stringify(data);
        localStorage.setItem('user', result);
        const user = JSON.parse(localStorage.getItem('user'));
        setUserInfo(user);
        if (user.role === 'seller') {
          return history.push('/seller/orders');
        }
        if (user.role === 'administrator') {
          return history.push('/admin/manage');
        }
        history.push('/customer/products');
      })
      .catch((err) => setError(err.response.data));
  };

  return (
    <div className="form-container">
      <video playsInline autoPlay muted loop id="myVideo">
        <source src="https://player.vimeo.com/external/543175330.sd.mp4?s=daf8fd4627cc89a064e251d02f0952773b119858&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
      </video>
      <form method="post" className="form-main">
        <img src={ logo } alt="trybeer" width={ 200 } />
        <label htmlFor="email-input" className="form-input">
          <p>Email</p>
          <input
            className="input-register"
            type="email"
            id="email-input"
            data-testid="common_login__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password-input">
          <p>Senha</p>
          <input
            className="input-register password-button"
            type="password"
            id="password-input"
            data-testid="common_login__input-password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          className="input login-button"
          type="submit"
          data-testid="common_login__button-login"
          disabled={ disabled }
          onClick={ (e) => loginPost(e) }
        >
          Login
        </button>
        <button
          className="input register-button"
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>

      </form>
      { error && (
        <span
          data-testid="common_login__element-invalid-email"
        >
          {error.message}
        </span>)}
    </div>

  );
}

export default Login;
