import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-buttons">
        <nav>
          <Link
            to="/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>
          <Link
            to="/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus pedidos
          </Link>
        </nav>
      </div>
      <h1 data-testid="customer_products__element-navbar-user-full-name">
        Olá
      </h1>
      <nav>
        <Link
          to="/logout"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Sair
        </Link>
      </nav>
    </header>
  );
}
