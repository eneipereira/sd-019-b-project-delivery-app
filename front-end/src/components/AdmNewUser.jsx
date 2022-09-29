import React from 'react';

function AdmNewUser() {
  return (
    <div>
      <h1>Cadastrar novo usuário</h1>
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              name="name"
              data-testid="admin_manage__input-name"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              data-testid="admin_manage__input-email"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
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
            type="button"
            data-testid="admin_manage__button-register"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdmNewUser;
