import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import '../styles/components/admUsersList.css';

function AdmListUsers() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // const history = useHistory();

  useEffect(() => {
    const listUsers = async () => {
      const response = await fetch('http://localhost:3001/login/users');
      const data = await response.json();
      setUsers(data);
    };
    listUsers();
  }, [loading]);

  const handleDelete = async (id) => {
    setLoading(true);
    await fetch(`http://localhost:3001/login/user/${id}`, {
      method: 'DELETE',
    });
    setLoading(false);
  };

  return (
    <div>
      <div className="userlist-container">
        <h1>Lista de usuários</h1>
        <table>
          <thead>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </thead>
          <tbody>
            {!users.length ? <p>Loading</p> : users.map((user, index) => (
              <tr key={ user.id }>
                <td
                  id="userlist-item"
                  data-testid={
                    `admin_manage__element-user-table-item-number-${user.id}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  id="userlist-name"
                  data-testid={
                    `admin_manage__element-user-table-name-${user.id}`
                  }
                >
                  {user.name}
                </td>
                <td
                  id="userlist-email"
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
                  id="userlist-delete"
                >
                  <button
                    type="button"
                    onClick={ () => handleDelete(user.id) }
                  >
                    Excluir

                  </button>

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
