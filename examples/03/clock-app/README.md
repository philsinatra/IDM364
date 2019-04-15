# Project A - Clock App

## Project Setup

The following steps can be done ahead of time to save time:

1. Setup project

    ```bash
    npm init react-app clock-app

    cd clock-app

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Clock App</title>
    </head>

    <body>
        <noscript>You need JavaScript to run this application.</noscript>
        <div id="app"></div>
    </body>

    </html>
    ```

## Development

- `src/index.js`

    ```javascript
    import React from 'react';
    import { render } from 'react-dom';

    render(
      <div>
        <h1>Hello Clock</h1>
      </div>,
      document.getElementById('app')
    );
    ```

- Start development server

    ```bash
    yarn start
    ```

- `src/css/screen.css`

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
        font: 100%/1.5 sans-serif;
    }
    ```

1. Create `components/Clock.js`

    ```javascript
    import React, { Component } from 'react';

    class Clock extends Component {
      render() {
        return (
          <div>
            <h1>Clock</h1>
          </div>
        );
      }
    }

    export default Clock;
    ```

1. Import `screen.css` & `Clock.js` component into `index.js`

    ```diff
    import React from 'react';
    import { render } from 'react-dom';
    + import './css/screen.css';
    + import Clock from './components/Clock';

    render(
    -  <div>
    -   <h1>Hello Clock</h1>
    - </div>,
    + <React.Fragment>
    +  <Clock />
    + </React.Fragment>,
      document.getElementById('app')
    );
    ```

## Setting the Initial State

Before we can use the state, we have to set the state, or initialize it. To set the initial state, we will use our class _constructor_ method, which is a special, reserved method that is triggered when a class is first created.

1. Add _constructor_ method to `Clock.js` component

    ```javascript
    constructor(props) {
      // Without this, logic in the parent component won't work.
      super(props);
      // The value of this.state must be an object.
      this.state = {
        currentTime: new Date().toLocaleString()
      };
    }
    ```

1. `npm start` and review _state_ in React Devtools

### Class Attributes For State

The technical committee behind the ECMAScript has added attributes to the class syntax in JavaScript. So not we can not only set the state in the constructor method, but all in the body of a class.

1. Update `Clock.js` component to use a state class attribute.

    ```diff
    - constructor(props) {
    -   super(props);
    -   this.state = {
    -     currentTime: new Date().toLocaleString()
    -   };
    - }
    + state = {
    +  currentTime: new Date().toLocaleString()
    + }
    ```

Note: **RETURN TO SLIDESHOW: Updating States**

## Update States

We've set the initial state, but we need to update the time every second. We can use the browser timer function `setInterval()` to execute a function every ✖️ number of milliseconds.

1. Create `launchClock()` method in `Clock.js` component.

    ```javascript
    launchClock() {
      setInterval(() => {
        console.log('Updating time...');
        this.setState({
          currentTime: new Date().toLocaleString()
        });
      }, 1000);
    }
    ```

We need to trigger this method once the component is loaded, so let's bring back our constructor method, which fires only once when the component is created.

1. Create `constructor()` method in `Clock.js`

    ```javascript
    constructor() {
      super();
      this.launchClock();
    }
    ```

1. Show devtools where time is updating
1. Update `render()` method to display the state variable

    ```diff
    render() {
      return (
        <div>
    -     <h1>Clock</h1>
    +     <h1>{this.state.currentTime}</h1>
        </div>
      );
    }
    ```