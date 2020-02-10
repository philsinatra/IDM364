# React Hooks

## Project Setup

The following steps can be done ahead of time to save time:

1. Setup project

    ```bash
    npm init react-app react-hooks

    cd react-hooks

    rm -rf .git
    rm src/App.css
    rm src/App.test.js
    rm src/index.css
    rm src/logo.svg
    rm src/serviceWorker.js
    ```

1. Update `package.json`

    ```diff
    "scripts": {
    - "start": "react-scripts start",
    + "start": "BROWSER='Firefox Nightly' react-scripts start",
      "build": "react-scripts build",
    ```

## Development

~~Right now, Hooks are available in the beta version or React, so in order to use them, we have to update the version of React from the stable release, to the beta release. We need to do this for React, and ReactDOM.~~

First, we'll clean up our `./src/index.js` index file:

```diff
import React from 'react';
import ReactDOM from 'react-dom';
- import './index.css';
import App from './App';
- import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
-  serviceWorker.unregister();
```

To get started, lets create a simple, functional component in our `./src/App.js` _App_ component. We'll remove everything that's there by default.

```javascript
import React from 'react';

const App = () => (
  <div>
    <p>You clicked the counter xx times</p>
    <button>Click Me</button>
  </div>
)

export default App;
```

When we test we see our UI. Our goal is to create a simple counter that increments every time the user clicks the button. We want to keep track of the current count, so we'll use _state_ to store the count.

In order to use state, we can't have a stateless functional component; we have to convert our code to use a _class_.

```diff
- import React from 'react';
+ import React, { Component } from 'react';

- const App = () => (
+ class App extends Component {
+ render() {
+   return (
      <div>
        <p>You clicked the counter xx times</p>
        <button>Click Me</button>
      </div>
+   )
+  }
+ }
- )

export default App;
```

Next we'll setup our _state_ object and initialize it with a value of zero.

```diff
class App extends Component {
+ state = {
+  count: 0
+ }

render() {
  return (
```

And then we'll use our _state_ in the display to show the current number, and add an _onClick_ event to the button that increments that value when it gets clicked.

```diff
<div>
- <p>You clicked the counter xx times</p>
- <button>Click Me</button>
+ <p>You clicked the counter {this.state.count} times</p>
+ <button onClick={() => this.setState({ count: this.state.count + 1 })}>
+   Click Me
+ </button>
</div>
```

This is how we've done everything so far, and this is all valid. But it was a lot of work - we already had our component written, and then we had to basically rewrite it as soon as we wanted to use _state_ because we have to use _classes_ when accessing _state_.

Some programmers find working with classes confusing. As components get more complex, our classes will get difficult to manage. Hooks will let us work with functions and still _hook_ into _state_. Let's update our component to use hooks. First, we'll reverse what we did to create a class, and set this component back to a functional component.

```javascript
import React from 'react';

function App() {
  return (
    <div>
      <p>You clicked the counter xx times</p>
      <button>Click Me</button>
    </div>
  )
};

export default App;
```

To get started, we'll look at the _useState_ hook, which will do just that, let us use state in our functional component.

```diff
- import React from 'react';
+ import React, { useState } from 'react';
```

In a _class_ we initialized the _count_ to 0 by setting `this.state` to an object `{count: 0}`.

In a function component, we have no `this`, so we can't assign or read `this.state`. Instead, we call the _useState_ hook directly in our component.

```diff
function App() {
+ const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked the counter xx times</p>
      <button>Click Me</button>
    </div>
  )
};
```

### What does calling `useState` do

> It declares a “state variable”. Our variable is called `count` but we could call it anything else, like `banana`. This is a way to “preserve” some values between the function calls — `useState` is a new way to use the exact same capabilities that `this.state` provides in a class. Normally, variables “disappear” when the function exits but state variables are preserved by React.

### What do we pass to useState as an argument

> The only argument to the `useState()` Hook is the initial state. Unlike with classes, the state doesn’t have to be an object. We can keep a number or a string if that’s all we need. In our example, we just want a number for how many times the user clicked, so pass `0` as initial state for our variable. (If we wanted to store two different values in state, we would call `useState()` twice.)

### What does useState return

> It returns a pair of values: the current state and a function that updates it. This is why we write `const [count, setCount] = useState()`. This is similar to `this.state.count` and `this.setState` in a class, except you get them in a pair.

### What do square brackets mean

```javascript
const [count, setCount] = useState(0);
```

The names in brackets on the left aren't part of the React API. This is JavaScript syntax called "array destructuring". It means we're making two new variables `count` and `setCount`, where `count` is set to the first value returned by `useState`, and `setCount` is the second.

This is the same as if we did:

```javascript
var countStateVariable = useState(0); // returns a pair
var count = countStateVariable[0]; // first item in the pair
var setCount = countStateVariable[1]; // second item in the pair
```

Now that we have these new variables, let's use them in our UI output.

To read the _state_ with classes we would access `this.state.count`. In a function, we can use `count` directly.

```diff
<div>
- <p>You clicked the counter xx times</p>
+ <p>You clicked the counter {count} times</p>
```

In a class, we need to call `this.setState()` to update the `count` state. In a function, we already have `setCount` and `count` as variables, so we don't need `this`.

```diff
- <button>Click Me</button>
+ <button onClick={() => setCount(count + 1)}>Click Me</button>
</div>
```

## Multiple State Variables

This is handy because we can give different names to different _state_ variables if we want to use more than one.

```diff
function App() {
  const [count, setCount] = useState(0);
+ const [fruit, setFruit] = useState('banana');

return (
  <div>
    <p>You clicked the counter {count} times</p>
    <button onClick={() => setCount(count + 1)}>Click Me</button>
+
+   <p>Your fruit is {fruit}</p>
+   <button onClick={() => setFruit('pear')}>Pear Please</button>
  </div>
);
```

We're able to update only the _fruit_ variable in the _state_ (as a string, not an object) without having to replace the entire _state_ object.

Let's add another input, this time a _select_ element.

```diff
<p>Your fruit is {fruit}</p>
  <button onClick={() => setFruit('pear')}>Pear Please</button>

+ <select
+   name="myfruit"
+   id="myfruit"
+ >
+   <option value="apple">apple</option>
+   <option value="grapes">grapes</option>
+   <option value="orange">orange</option>
+ </select>
</div>
```

Next, let's setup a handler for when the value of the _select_ element changes.

```diff
const [count, setCount] = useState(0);
const [fruit, setFruit] = useState('banana');

+ const handleChange = event => {
+   console.log('handleChange');
+   console.log(event);
//
+   console.log(event.target.value);
+ };
```

We need to do is attached this handler to the _select_ element.

```diff
<select
  name="myfruit"
  id="myfruit"
+ onChange={event => handleChange(event)}
>
```

And then we need to make the handler actually update the state.

```diff
const [count, setCount] = useState(0);
const [fruit, setFruit] = useState('banana');

const handleChange = event => {
- console.log('handleChange');
- console.log(event);
- console.log(event.target.value);
+ setFruit(event.target.value);
};
```

## Effect Hook

Next we'll take a look at the _effect hook_, which lets you perform side effects in function components, similar to _componentDidMount_ and _componentDidUpdate_.

```diff
- import React, { useState } from 'react';
+ import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [fruit, setFruit] = useState('banana');

  const handleChange = event => {
    // console.log('handleChange');
    // console.log(event.target.value);
    setFruit(event.target.value);
  };

+ useEffect(() => {
+   document.title = `${fruit} ${count}`;
+ });

  return (
```

If we were working with classes, we put these effects into `componentDidMount` and `compontentDidUpdate`, so we'd have something like this:

```javascript
componentDidMount() {
  document.title = `${this.state.fruit} ${this.state.count}`;
}

componentDidUpdate() {
  document.title = `${this.state.fruit} ${this.state.count}`;
}
```

We've duplicated our code in these life cycle methods in class. There's many cases where we want to perform the same side effect regardless of whether the component just mounted, or if it has been updated. Conceptually, we want it to happen after every render - but life cycle component don't have a method for this. The `useEffect` hook will allow us to do this.

### What does `useEffect do

> By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates. In this effect, we set the document title, but we could also perform data fetching or call some other imperative API.

### Why is `useEffect` called inside a component

> Placing useEffect inside the component lets us access the count state variable (or any props) right from the effect. We don’t need a special API to read it — it’s already in the function scope.

### Does `useEffect` run after every render

> Yes! By default, it runs both after the first render and after every update. Instead of thinking in terms of "mounting" and “updating”, you might find it easier to think that effects happen “after render”. React guarantees the DOM has been updated by the time it runs the effects.

## Other Hooks

The official React documentation includes more examples an explanations about all of the available hooks, as well as status information about how to use these new functions, and when they'll be available in the official React release.