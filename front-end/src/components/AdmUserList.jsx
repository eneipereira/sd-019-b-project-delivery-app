import React, { useEffect } from 'react';

function AdmListUsers() {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    const listUsers = async () => {
      const response = await fetch('http://localhost:3001/login/users');
      const data = await response.json();
      setUsers(data);
    };
    listUsers();
  }, []);

  return (
    <div>
      <h1>Lista de usuários</h1>
      <div>
        <table>
          <thead>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </thead>
          <tbody>
            {!users.length ? <p>Loading</p> : users.map((user) => (
              <tr key={ user.id }>
                <td
                  data-testid={
                    `admin_manage__element-user-table-item-number-${user.id}`
                  }
                >
                  {user.id}
                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-name-${user.id}`
                  }
                >
                  {user.name}
                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-email-${user.id}`
                  }
                >
                  {user.email}

                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-role-${user.id}`
                  }
                >
                  {user.role}

                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-remove-${user.id}`
                  }
                >
                  <button type="button">Excluir</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdmListUsers;
