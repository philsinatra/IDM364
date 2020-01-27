import React, { Component } from 'react';

class Users extends Component {
  state = {
    users: []
  };

  async fetchUsers() {
    const result = await fetch(this.props['data-url']);
    const users = await result.json();
    this.setState({ users });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <div className="container">
        <h1>List of Users</h1>
        <table>
          <thead>
            <tr>
              <th>User name</th>
              <th>Email</th>
              <th>IP address</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user.id}>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email}</td>
                <td>{user.ip_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;
