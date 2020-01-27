import React, { useState, useEffect } from 'react';
const dataUrl = './users.json';

const App = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const result = await fetch(dataUrl);
    const users = await result.json();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   console.log('users:', users);
  // }, [users]);

  if (users.length) {
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {users.map(user => {
            const { ip_address, first_name, last_name, email } = user;
            return (
              <li key={ip_address}>
                <ul>
                  <li>
                    {first_name} {last_name}
                  </li>
                  <li>{email}</li>
                  <li>{ip_address}</li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return '';
};

export default App;
