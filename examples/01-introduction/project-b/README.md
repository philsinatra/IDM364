# Project B

1. Globally install `create-react-app`

    ```bash
    npm install -g create-react-app
    ```

1. Create a new React project

    ```bash
    npm init react-app my-app
    ```

1. Remove `.git`

    ```bash
    cd my-app
    rm -rf .git
    ```

1. Clean default project files

    ```bash
    cd src
    rm *
    cd ../public
    rm manifest.json
    rm favicon.ico
    ```

1. Update `package.json` to use Firefox Nightly

    ```json
    "start": "BROWSER='Firefox Nightly' react-scripts start",
    ```

1. Prepare source folder

    ```bash
    cd src
    mkdir components css
    ```

1. Create `src/components/HelloWorld.js` component

    ```javascript
    import React, { Component } from 'react';

    class HelloWorld extends Component {
      render() {
        return (
          <div>
            <h1>Hello World</h1>
          </div>
        );
      }
    }

    export default HelloWorld;
    ```

1. Create `src/index.js`

    ```javascript
    import React from 'react';
    import { render } from 'react-dom';
    import HelloWorld from './components/HelloWorld';

    render(
      <div>
        <HelloWorld />
      </div>,
      document.getElementById('app')
    );
    ```

1. Update `public/index.html`

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My React App</title>
    </head>

    <body>
        <noscript>You need JavaScript to run this application.</noscript>
        <div id="app"></div>
    </body>

    </html>
    ```

1. Create `Nav.js` component

    ```javascript
    import React, { Component } from 'react';

    class Nav extends Component {
      render() {
        return (
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </nav>
        );
      }
    }

    export default Nav;
    ```

1. Add `Nav.js` component to `index.js`

    ```javascript
    import Nav from './components/Nav';
    //
    <Nav />
    ```

1. Switch `Nav.js` component to be in `HelloWorld.js`
1. Create `NavLink.js` component

    ```javascript
    import React, { Component } from 'react';

    class NavLink extends Component {
      render() {
        return (
          <li><a href="#">Link Text</a></li>
        );
      }
    }

    export default NavLink;
    ```

1. Map array to a function that builds nav links in `Nav.js` component

    ```javascript
    import NavLink from './NavLink';
    //
    links = ['home', 'about', 'contact'];
    //
    render() {
      return (
        <nav>
          <ul>
            {this.links.map(link => (
              <NavLink linkItem={link} />
            ))}
          </ul>
        </nav>
      );
    }
    ```

1. Update `NavLink.js` to accept the props

    ```javascript
    return (
      <li>
        <a href={`#${this.props.linkItem}`}>{this.props.linkItem}</a>
      </li>
    );
    ```

1. Update `Nav.js` to deal with _key_ error

    ```javascript
    <NavLink key={link} linkItem={link} />
    ```

1. Move `links` array to a config file

    ```javascript
    // ./config.js
    export const links = ['home', 'about', 'contact'];
    //
    // Nav.js
    import links from '../config';
    //
    {links.map(link => (
    ```

1. Fix `Nav.js` to address default export error

    ```javascript
    import { links } from '../config';
    ```

1. Edit `config.js` links array to show updated browser
1. Create `css/screen.css`

    ```css
    :root {
        box-sizing: border-box;
        font-size: 100%;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit
    }

    body {
        background-color: #111;
        color: #fff;
        font: 100%/1.5 sans-serif;
    }
    ```

1. Link CSS into `index.js`

    ```javascript
    import './css/screen.css';
    ```

1. Add a `className="nav"` to the ul in `Nav.js`

    ```javascript
    <ul className="nav">
    ```

    ```css
    .nav {
        display: flex;
        justify-content: flex-end;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .nav li a {
        color: #fff;
        text-decoration: none;
        display: block;
        padding: .5rem;
        text-transform: uppercase;
    }

    .nav li a:hover {
        background-color: darkblue;
    }
    ```
