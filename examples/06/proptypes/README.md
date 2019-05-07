# PropTypes

## Project Setup

The following steps can be done ahead of time to save time:

1. Setup project

    ```bash
    npm init react-app proptypes

    cd proptypes

    rm -rf .git
    ```

We'll work with the default app content for this example. Let's start by creating our own button component.

- `./src/Button.js`

```javascript
import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button>Hello Button</button>
    );
  }
}

export default Button;
```

And then we'll import that component into our `./src/App.js`

```diff
import React, { Component } from 'react';
+ import Button from './Button';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
-         <p>
-           Edit <code>src/App.js</code> and save to reload.
-         </p>
+         <Button />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

In order to use PropTypes, we'll need to import the package into our project.

```bash
npm i --save prop-types
```

And then we can import into our `./src/Button.js` _Button_ component. We'll change the hard coded button label to use a _prop_.

Finally we'll add the `propTypes` object after our class definition.

```diff
import React, { Component } from 'react';
+ import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
-     <button>Hello Button</button>
+     <button>{this.props.label}</button>
    );
  }
}

+ Button.propTypes = {
+  label: PropTypes.string
+ };

export default Button;
```

We're saying that the _Button_ class includes a prop type check for the prop _label_ which should be a _string_.

Let's go back to our `./src/App.js` _App_ component and pass in a prop for the label.

```diff
<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
- <Button />
+ <Button label="Fun With propTypes" />
<a
  className="App-link"
  href="https://reactjs.org"
```

Now we can test our validation. Let's change the `propType` from _string_ to _number_.

```diff
Button.propTypes = {
- label: PropTypes.string
+ label: PropTypes.number
};
```

## Requiring Props

What if we have a validator set, but a prop is omitted? Let's add a second button that doesn't include the _label_ prop.

```diff
<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
  <Button label="Fun With propTypes" />
+ <Button />
<a
  className="App-link"
  href="https://reactjs.org"
```

We see when we test that this is not ideal, since the button has no label text. We can set up the validator to report cases like this to us so we fix the issue before the app progresses.

Let's update `./src/Button.js` the _Button_ component to require a label prop.

```diff
Button.propTypes = {
- label: PropTypes.string
+ label: PropTypes.string.isRequired
};
```

Let's add another _prop_ to `./src/App.js` our _App_ component, this time a function.

```diff
import React, { Component } from 'react';
import Button from './Button';
- import logo from './logo.svg';
import './App.css';

class App extends Component {
+ updateState = () => {
+   console.log('Update App State');
+ };

  render() {
    return (
      <div className="App">
        <header className="App-header">
-         <img src={logo} className="App-logo" alt="logo" />
-         <Button label="Fun With propTypes" />
+         <Button label="Fun With propTypes" updateState={this.updateState} />
-         <Button label="Here you go" />
          <a
            className="App-link"
            href="https://reactjs.org"
```

We're passing the `updateState` method to our _Button_ component. In our `./src/Button.js` _Button_ component, we'll use this function for our `onClick` handler, and we'll update our propTypes to include `updateState` and declare it as a require prop of type _func_ for function.

```diff
- return <button>{this.props.label}</button>;
+ return <button onClick={this.props.updateState}>{this.props.label}</button>;
```

```diff
Button.propTypes = {
- label: PropTypes.string.isRequired
+ label: PropTypes.string.isRequired,
+ updateState: PropTypes.func.isRequired
};
```

## Helper Functions

Another quick thing I wanted to show you is how you can take advantage of this JavaScript import syntax for utilities that you may use around your application.

Let's pretend you're building an online store and you have a number of products for sale. Prices for the products range from a few dollars to a few thousand dollars and can change at any point. Storing price information in a database can be tricky.

- what format should you use? (number, decimal, string)
- should the database include a dollar sign?

Think about what would be the easiest. For me, I tend to store these types of values as a number, and formatted as a total number of cents. So rather than storing a string that includes dollar sign, five, period zero zero, I can store a number 500, which is 500 cents.

When it comes time to display the price, I can write a little function to convert the cents to dollars, convert the number to a string and add a dollar sign to the front of the value. This is an example of a utility or helper function, and with JavaScript's import syntax, we can store all of these types of functions in a single file and access them anywhere in our app.

Let's create a `./src/utilities.js` utilities file in our project, and add a function that does this conversion I'm talking about.

```javascript
function formatPrice(cents) {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}
```

In order to use this function in our other files, we have to export it out of the `./src/utilities.js` file.

```diff
- function formatPrice(cents) {
+ export function formatPrice(cents) {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}
```

Now we can import this _named_ function in any of our other files. Let's go back to `./src/App.js` our _App_ component and to just that.

```diff
import React, { Component } from 'react';
import Button from './Button';
+ import { formatPrice } from './utilities';
import './App.css';
```

Then we can call this function within our _App_ component.

```diff
<header className="App-header">
  <Button label="Fun With propTypes" updateState={this.updateState} />
+ <h1>{formatPrice(4238)}</h1>
</header>
```

You can store any utility scripts your application needs in files like this, and then import only the pieces you need in the components that need them, which makes leaner, more efficient code.