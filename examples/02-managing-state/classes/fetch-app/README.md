# Fetch App

## Project Setup

The following steps can be done ahead of time to save time:

1. Setup project

    ```bash
    npm init react-app fetch-app

    cd fetch-app

    rm -rf .git
    rm public/favicon.ico;
    rm public/manifest.json;
    rm src/*
    ```

1. `.vscode/settings.json`

    ```json
    {
      "files.associations": {
        "**/*.js": "javascriptreact"
      }
    }
    ```

1. Update `package.json` script

    ```diff
    - "start": "react-scripts start",
    + "start": "BROWSER='Firefox Nightly' react-scripts start",
    ```

1. Set `public/index.html`

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="witdh=device-witdh, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Fetch App</title>
    </head>

    <body>
      <div id="app"></div>
    </body>

    </html>
    ```

1. Create `public/real-user-data.json`

    ```json
    [{
      "id": 1,
      "first_name": "Patrick",
      "last_name": "Kim",
      "email": "pkim0@twitter.com",
      "gender": "Male",
      "ip_address": "96.145.80.132"
    }, {
      "id": 2,
      "first_name": "Julia",
      "last_name": "Gordon",
      "email": "jgordon1@google.com.au",
      "gender": "Female",
      "ip_address": "164.174.125.92"
    }, {
      "id": 3,
      "first_name": "Kathleen",
      "last_name": "Armstrong",
      "email": "karmstrong2@reference.com",
      "gender": "Female",
      "ip_address": "148.128.238.84"
    }, {
      "id": 4,
      "first_name": "Betty",
      "last_name": "Garcia",
      "email": "bgarcia3@purevolume.com",
      "gender": "Female",
      "ip_address": "117.71.246.128"
    }, {
      "id": 5,
      "first_name": "Wanda",
      "last_name": "Ross",
      "email": "wross4@amazon.co.uk",
      "gender": "Female",
      "ip_address": "101.153.132.101"
    }, {
      "id": 6,
      "first_name": "Mark",
      "last_name": "Lopez",
      "email": "mlopez5@newsvine.com",
      "gender": "Male",
      "ip_address": "130.186.223.106"
    }, {
      "id": 7,
      "first_name": "Katherine",
      "last_name": "Carroll",
      "email": "kcarroll6@exblog.jp",
      "gender": "Female",
      "ip_address": "48.159.239.241"
    }, {
      "id": 8,
      "first_name": "Jonathan",
      "last_name": "Harris",
      "email": "jharris7@hp.com",
      "gender": "Male",
      "ip_address": "121.101.33.233"
    }, {
      "id": 9,
      "first_name": "Christina",
      "last_name": "Gardner",
      "email": "cgardner8@goo.gl",
      "gender": "Female",
      "ip_address": "142.233.177.121"
    }, {
      "id": 10,
      "first_name": "Sandra",
      "last_name": "Sanchez",
      "email": "ssanchez9@github.io",
      "gender": "Female",
      "ip_address": "78.27.23.245"
    }]
    ```

## Development

The following steps should be done as a demonstration.

1. Setup `src/index.js`

    ```javascript
    import React from 'react';
    import { render } from 'react-dom';

    render(
      <React.Fragment>
        <h1>Hello World</h1>
      </React.Fragment>,
      document.getElementById('app')
    );
    ```

1. Create `src/components/Users.js`

    ```javascript
    import React, { Component } from 'react';

    class Users extends Component {
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
            </table>
          </div>
        );
      }
    }

    export default Users;
    ```

1. Copy `real-user-data.json` to `public/` directory. The data must be in the public directory for the `fetch` API to be able to find it.
1. Update `src/index.js`

    ```diff
    import React from 'react';
    import { render } from 'react-dom';
    + import Users from './components/Users';

    + const dataUrl = './real-user-data.json';

    render(
      <React.Fragment>
    -   <h1>Hello World</h1>
    +   <Users data-url={dataUrl} />
      </React.Fragment>,
      document.getElementById('app')
    );
    ```

1. Update `src/components/Users.js` to set initial state as an empty array. Then add the `componentDidMount()` method and fetch the JSON data.

    ```diff
    import React, { Component } from 'react';

    class Users extends Component {
    +   state = {
    +    users: []
    +   }

    + componentDidMount() {
    +  fetch(this.props['data-url'])
    +   .then(response => response.json())
    +   .then(users => this.setState({ users: users }))
    +   .catch(error => {
    +     console.error(error);
    +   });
    + }

      render() {
      ...
    ```

1. Simplify `setState()` method since the state key and the variable holding the new user data is identical

    ```diff
    -   .then(users => this.setState({ users: users }));
    +   .then(users => this.setState({ users }));
    ```

1. Update `src/components/Users.js` to display the content from the JSON data

We need to create an array out of the JSON data and loop through that data to display a new table row of information for each entry. So we could create an empty array, and then setup a loop and do a push...

```javascript
const usersArray = [];

for (const user of this.state.users) {
  usersArray.push(user);
}
```

But since we're trying to write more declarative code, instead we'll use the `map()` method.

> The map() method creates a new array with the results of calling a provided function on every element in the calling array.

- [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

Let's build a quick example:

- Create new Quokka.js file and test

    ```javascript
    const array = [1,2,3,4];
    const map = array.map(x => x * 2);
    console.log(map);
    ```

Now let's use a `map()` method to build out our user data:

```diff
<table>
  <thead>
    <tr>
      <th>User name</th>
      <th>Email</th>
      <th>IP address</th>
    </tr>
  </thead>
+ <tbody>
+   {this.state.users.map(user => (
+     <tr key={user.id}>
+       <td>
+         {user.first_name} {user.last_name}
+       </td>
+       <td>{user.email}</td>
+       <td>{user.ip_address}</td>
+     </tr>
+   ))}
+ </tbody>
</table>
```

## Refactor Data Fetch

We can refactor our code a bit to make it a bit easier to read by taking advantage of JavaScript's `async/await` syntax.

`async/await` is a special syntax for making working with promises more comfortable, and I think easier to understand.

1. Create a new method `fetchUsers()`

    ```diff
    +  fetchUsers() {
    +   console.log('fetching users);
    +  }

    componentDidMount() {
    +  this.fetchUsers();
       // fetch(this.props['data-url'])
       //   .then(response => response.json())
       //   .then(users => this.setState({ users }))
       //   .catch(error => {
       //     console.error(error);
       //   });
     }
    ```

1. Set the new method to work asynchronously.

    ```diff
    - fetchUsers() {
    + async fetchUsers() {
      console.log('fetching users);
    }
    ```

Using `async` in front of a function/method does one simple thing: returns a promise. `async` ensures that the function/method returns a promise, which we can then use to guarantee our data is available before we try to render it.

The second part of the `async/await` syntax is the `await` which makes JavaScript wait until the promise settles and returns its result.

1. Build `fetchUsers()` method

    ```diff
    async fetchUsers() {
      console.log('fetching users');
    + const result = await fetch(this.props['data-url']);
    + const data = await result.json();
    + this.setState({ users: data });
    }
    ```

1. Refactor the variable name to simplify the code (if desired)

    ```diff
    async fetchUsers() {
      const result = await fetch(this.props['data-url']);
    - const data = await result.json();
    - this.setState({ users: data });
    + const users = await result.json();
    + this.setState({ users });
    }
    ```