# Sample Babel Setup

1. `npm init`
1. Install Babel CLI and React presets locally, using NPM.

    ```bash
    npm i -D babel-cli babel-preset-react
    ```

1. Add Babel config to `package.json`

    ```json
    "babel": {
      "presets": ["react"]
    }
    ```

1. Create project _build_ folder
    - `mkdir js`
    - index.html

      ```html
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My App</title>
        <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
      </head>

      <body>
        <div id="content"></div>
        <script src="js/main.js"></script>
      </body>

      </html>
      ```

1. Create project _src_ folder
    - components
      - App.js

        ```jsx
        class HelloWorld extends React.Component {
          render() {
            return React.createElement(
              'h1',
              this.props,
              `Hello ${this.props.frameworkName} world!`
            );
          }
        }

        ReactDOM.render(
          <div>
            <HelloWorld
              id="ember"
              frameworkName="Ember.js"
              title="A framework for creating ambitious web applications."
            />
            <HelloWorld
              id="backbone"
              frameworkName="Backbone.js"
              title="Web app structure from backbone.js"
            />
            <HelloWorld
              id="angular"
              frameworkName="Angular.js"
              title="JavaScript MVN Framework."
            />
          </div>,
          document.getElementById('content')
        );
        ```

1. Set VSCode language to _javascriptreact_
1. Run Babel Script

    ```bash
    ./node_modules/.bin/babel src/components/App.js -o build/js/main.js
    ```

1. Create script shortcut in `package.json`

    ```json
    "scripts": {
      "build": "./node_modules/.bin/babel src/components/App.js -o build/js/main.js"
    },
    ```

1. Run build shortcut

    ```bash
    npm run build
    ```

1. Add watch shortcut

    ```json
    "watch": "./node_modules/.bin/babel src/components/App.js -o build/js/main.js -w"
    ```

1. Run watch shortcut

    ```bash
    npm run watch
    ```