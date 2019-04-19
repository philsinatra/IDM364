# React Router

## Project Setup

The following steps can be done ahead of time to save time:

Anyone else tired of doing this over and over? I know I am.

- Copy `make` script to `~/Desktop` and run it.

1. Setup project

    ```bash
    npm init react-app event_handling

    cd event_handling

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
        <title>Event Handling</title>
    </head>

    <body>
        <noscript>You need JavaScript to run this application.</noscript>
        <div id="app"></div>
    </body>

    </html>
    ```

## Development

1. Setup `src/index.js` as the main script file.

    ```javascript
    import React from 'react';
    import { render } from 'react-dom';

    render(
      <React.Fragment>
        <h1>Hello World!</h1>
      </React.Fragment>,
      document.getElementById('app')
    );
    ```

1. Create `src/components/Button.js` component

    ```javascript
    import React, { Component } from 'react';

    class Button extends Component {
      clickHandler() {
        console.log('Handle my click please.');
      }

      render() {
        return <button onClick={this.clickHandler}>My Button</button>;
      }
    }

    export default Button;
    ```

1. Add `Button` component to `src/index.js`

    ```diff
    import React from 'react';
    import { render } from 'react-dom';
    + import Button from './components/Button';

    render(
      <React.Fragment>
        <h1>Hello World!</h1>
    +   <Button />
      </React.Fragment>,
      document.getElementById('app')
    );
    ```

1. Update `./src/components/Button.js` to include a `onMouseHover()` event

    ```diff
    class Button extends Component {
      clickHandler() {
        console.log('Handle my click please.');
      }

    +  hoverHandler() {
    +    console.log('Hovering over my button!');
    +  }

      render() {
    +   return (
          <button
            onClick={this.clickHandler}
    +       onMouseOver={this.hoverHandler}
          >
            My Button
          </button>
        );
      }
    }
    ```

1. Update `./src/index.js` to include a custom prop

    ```diff
    + const message = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero vel voluptas voluptatem beatae dolorem ipsum expedita a laborum ullam veritatis?';

    render(
      <React.Fragment>
    -   <Button />
    +   <Button myMessage={message} />
      </React.Fragment>,
      document.getElementById('app')
    );
    ```

1. Update `./src/components/Button.js` to log the custom message

    ```diff
    render() {
      return (
        <button
    -     onClick={this.clickHandler}
    +     onClick={() => {
    +       this.clickHandler(this.props.myMessage);
    +     }}
          onMouseOver={this.hoverHandler}
        >
          My Button
        </button>
      );
    }
    ```

    ```diff
    - clickHandler() {
    + clickHandler(message) {
    -  console.log('Handle my click please.');
    +  console.log(message);
    }
    ```

1. Update `./src/components/Button.js` to use _state_ for the message

    ```diff
    return (
    + <React.Fragment>
        <button
          onClick={() => {
            this.clickHandler(this.props.myMessage);
          }}
        >
          My Button
        </button>
    + </React.Fragment>
    );
    ```

    ```diff
    class Button extends Component {
    + state = {
    +   message: ''
    + };

      clickHandler(message) {
    -   console.log(message);
    +   this.setState({ message });
      }
    ```

    ```diff
    <React.Fragment>
      <button
        onClick={() => {
          this.clickHandler(this.props.myMessage);
        }}
      >
        My Button
      </button>

    + <div>{this.state.message}</div>
    </React.Fragment>
    ```

1. Create another button instance as an example

## Parent Trap

In React, data flows down from parent to child. It does not flow back up from child to parent. This is intentional. We can pass methods from the parent component to the child component, and then access those methods as _props_ in the child components.

1. Update `./src/index.js` to use a parent `./src/components/App.js` component

    ```javascript
    import React from 'react';
    import { render } from 'react-dom';
    import App from './components/App';

    render(
      <React.Fragment>
        <App />
      </React.Fragment>,
      document.getElementById('app')
    );
    ```

1. Create `./src/components/App.js`

    ```javascript
    import React, { Component } from 'react';
    import Button from './Button';

    class App extends Component {
      render() {
        return (
          <>
            <Button myMessage="hello world!" />
          </>
        );
      }
    }

    export default App;
    ```

1. Add custom method to `./src/components/App.js`

    ```diff
    class App extends Component {
    + myMethod() {
    +  console.log('myMethod!');
    + }
    ```

1. Pass the new method as a _prop_ to the child component

    ```diff
    return (
      <>
    -   <Button myMessage="hello world!" />
    +   <Button myMethod={this.myMethod} />
      </>
    );
    ```

1. Update `./src/components/Button.js` to reference the new method _onClick_

    ```diff
    <button
      onClick={() => {
    -   this.clickHandler(this.props.myMessage);
    +   this.props.myMethod();
      }}
    >
    ```

## Loading Data `onClick`

Let's expand our example so that the button loads some data into our application.

1. Update `./src/components/App.js` to include a new custom function that loads our data, and pass that function to our _Button_ component as a prop.

    ```diff
    + loadSigns = () => {
    +   console.log('Load Signs');
    + }

    render() {
      return (
        <>
    -     <Button myMessage="hello world!" myMethod={this.myMethod} />
    +     <Button myMessage="hello world!" loadSigns={this.loadSigns} />
        </>
      );
    }
    ```

1. Update `./src/components/Button.js` to call this new function when the button is clicked.

    ```diff
    <button
      onClick={() => {
    -   this.props.myMethod();
    +   this.props.loadSigns();
      }}
    >
    ```

1. Add `./src/js/signs.js` with signs data object

    ```javascript
    const signs = {
      sign1: {
        name: 'rat',
        image: 'rat.svg',
        desc: 'Intelligent, adaptable, quick-witted, charming, artistic, sociable'
      },
      sign2: {
        name: 'ox',
        image: 'ox.svg',
        desc: 'Loyal, reliable, thorough, strong, reasonable, steady, determined'
      },
      sign3: {
        name: 'tiger',
        image: 'tiger.svg',
        desc: 'Enthusiastic, courageous, ambitious, leadership, confidence, charismatic'
      },
      sign4: {
        name: 'rabbit',
        image: 'rabbit.svg',
        desc: 'Trustworthy, empathic, modest, diplomatic, sincere, sociable, caretakers, sensitive.'
      },
      sign5: {
        name: 'dragon',
        image: 'dragon.svg',
        desc: 'Lucky, flexible, eccentric, imaginative, artistic, spiritual, charismatic'
      },
      sign6: {
        name: 'snake',
        image: 'snake.svg',
        desc: 'Philosophical, organized, intelligent, intuitive, elegant, attentive, decisive'
      },
      sign7: {
        name: 'horse',
        image: 'horse.svg',
        desc: 'Adaptable, loyal, courageous, ambitious, intelligent, adventurous, strong'
      },
      sign8: {
        name: 'goat',
        image: 'goat.svg',
        desc: 'Tasteful, crafty, warm, elegant, charming, intuitive, sensitive, calm'
      },
      sign9: {
        name: 'monkey',
        image: 'monkey.svg',
        desc: 'Quick-witted, charming, lucky, adaptable, bright, versatile, lively, smart'
      },
      sign10: {
        name: 'rooster',
        image: 'rooster.svg',
        desc: 'Honest, energetic, intelligent, flamboyant, flexible, diverse, confident'
      },
      sign11: {
        name: 'dog',
        image: 'dog.svg',
        desc: 'Loyal, sociable, courageous, diligent, steady, lively, adaptable, smart'
      },
      sign12: {
        name: 'pig',
        image: 'pig.svg',
        desc: 'Honorable, philanthropic, determined, optimistic, sincere, sociable.'
      }
    }

    export default signs;
    ```

1. Update `.vscode/settings.json`

    ```diff
    {
      "files.associations": {
        "**/*.js": "javascriptreact",
    +   "**/js/*.js": "javascript"
      }
    }
    ```

1. Import _signs_ from `./src/js/signs.js`

    ```diff
    + import signs from '../js/signs.js';

    class App extends Component {
    + state = {
    +  signs: []
    + };

    myMethod() {
      console.log('myMethod!');
    }

    + loadSigns = () => {
    +   console.log('Load Signs');
    +   this.setState({ signs });
    + };

    render() {
      return (
        <>
    -       <Button myMessage="hello world!" myMethod={this.myMethod} />
    +       <Button myMessage="hello world!" loadSigns={this.loadSigns} />
    ```

## Add Each Sign To App

Next we would want to loop over the signs data and display each sign in the app. It may be tempting to loop over and render out a bunch of list items.

```html
<ul class="signs">
  <li>Sign 1</li>
  ...
```

In React, we want to create reusable components. So instead, we'll create a new component `Sign` which will handle the rendering of each individual sign.

So next it may be tempting to create a bunch of _Sign_ component references:

```javascript
<ul class="signs">
  <Sign />
  <Sign />
  <Sign />
  ...
```

Instead, we'll use some type of a loop to iterate over each of the signs from our signs data. The first thing you should notice is that our sign data is currently an object, which isn't exactly perfect since we're going to loop over this data using a `map` or `forEach` function which both work with arrays, not objects.

We'll need to convert the data, or access each object key as an array of data. And we can do that with `Object.keys`

1. Add unordered list with key mapping to `./src/components/App.js`

    ```diff
    <Button myMessage="hello world!" loadSigns={this.loadSigns} />
    + <ul className="signs">
    +  {Object.keys(this.state.signs).map(key => (
    +    <li>{key}</li>
    +  ))}
    + </ul>
    ```

1. Update the function to resolve the unique key error

    ```diff
    <ul className="signs">
     {Object.keys(this.state.signs).map(key => (
    -  <li>{key}</li>
    +  <li key={key}>{key}</li>
     ))}
    </ul>
    ```

1. Update the function to send all of the sign data to the _Sign_ component

    ```diff
    <ul className="signs">
      {Object.keys(this.state.signs).map(key => (
    -   <li key={key}>{key}</li>
    +   { /* <Sign key={key} details={this.state.signs.sign1} /> */ }
    +   { /* <Sign key={key} details={this.state.signs.sign2} /> */ }
    +   <Sign key={key} details={this.state.signs[key]} />
      ))}
    </ul>
    ```

1. Create `./src/components/Sign.js` component

    ```javascript
    import React, { Component } from 'react';

    class Sign extends Component {
      render() {
        return (
          <li>
            <img src={this.props.details.image} alt={this.props.details.name} />
            <h2>{this.props.details.name}</h2>
            <p>{this.props.details.desc}</p>
          </li>
        );
      }
    }

    export default Sign;
    ```

1. Import `Sign` component into `./src/components/App.js`

    ```diff
    + import Sign from './Sign';
    ```

1. Update `./src/components/Sign.js`, refactoring long, repetitive variables.

    ```diff
    render() {
    + // const image = this.props.details.image;
    + // const name = this.props.details.name;
    + // const desc = this.props.details.desc;

    /*
      We can use ES6 destructuring which allows us to set multiple
      variables in a single shot. This will assign each variable
      based on the matching value that comes from this.props.details.
    */
    + const { image, name, desc } = this.props.details;
      return (
        <li key="this.props.key">
    -     <img src={this.props.details.image} alt={this.props.details.name} />
    -     <h2>{this.props.details.name}</h2>
    -     <p>{this.props.details.desc}</p>
    +     <img src={image} alt={name} />
    +     <h2>{name}</h2>
    +     <p>{desc}</p>
        </li>
      );
    ```

1. Create `./src/screen.css`

    ```css
    :root {
      box-sizing: border-box;
      font-size: 100%;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    body {
      background-color: lightgray;
      font: 100%/1.5 sans-serif;
    }

    .signs {
      background-color: white;
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: repeat(4, 1fr);
      line-height: 1.2;
      list-style: none;
      margin: 0 auto;
      max-width: 56.25rem;
      padding: 1rem;
    }

    .signs h2 {
      text-transform: uppercase;
    }

    .signs li img {
      max-height: 12.5rem;
      max-width: 12.5rem;
    }
    ```

1. Add CSS file to `./src/index.js`

    ```diff
    import React from 'react';
    import { render } from 'react-dom';
    import App from './components/App';
    + import './screen.css';
    ```

1. Copy images from IDM231 project.