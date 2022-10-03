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
      <div className="header-buttons">
        <nav>
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>
          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus pedidos
          </Link>
        </nav>
      </div>
      <h3 data-testid="customer_products__element-navbar-user-full-name">
        { userInfo.name }
      </h3>
      <nav>
        <Link
          to="/login"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => handleLogout() }
        >
          Sair
        </Link>
      </nav>
    </header>
  );
}
