import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';
import '../styles/components/header.css';

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
            to="/admin/manage"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Gerenciar usuários
          </Link>
        </nav>
      </div>
      <h1 data-testid="customer_products__element-navbar-user-full-name">
        { userInfo.name }
      </h1>
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
