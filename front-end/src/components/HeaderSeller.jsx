import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';
import '../styles/components/header.css';
import logo from '../images/logo.png';

export default function Header() {
  const { userInfo, setUserInfo, handleLogout } = useLoginContext();

  useEffect(() => {
    const userData = () => {
      setUserInfo(JSON.parse(localStorage.getItem('user')));
    };

    userData();
  }, [setUserInfo]);

  return (
    <header className="header-container">
      <div>
        <img src={ logo } alt="trybeer" />
      </div>
      <h1
        className="header-name"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { userInfo.name }
      </h1>
      <div className="header-buttons">
        <nav>
          <Link
            to="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </Link>
        </nav>
      </div>
      <div
        className="header-logout"
      >
        <nav>
          <Link
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => handleLogout() }
          >
            Sair
          </Link>
        </nav>
      </div>
    </header>
  );
}
