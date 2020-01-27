# React Router

## Project Setup

The following steps can be done ahead of time to save time:

1. Setup project

    ```bash
    npm init react-app router

    cd router

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
        <title>Router App</title>
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

1. Create `src/components/Home.js` as a stateless component

    ```javascript
    import React from 'react';

    const Home = () => <h1>Home</h1>;

    export default Home;
    ```

1. Add `Home` component to `src/index.js`

    ```diff
    import React from 'react';
    import { render } from 'react-dom';
    + import Home from './components/Home';

    render(
      <React.Fragment>
        <h1>Hello World!</h1>
    +   <Home />
      </React.Fragment>,
      document.getElementById('app')
    );
    ```

1. Create `src/components/About.js` and `src/components/Contact.js` components.

    ```javascript
    import React from 'react';
    const About = () => <h1>About</h1>;
    export default About;
    //
    import React from 'react';
    const Contact = () => <h1>Contact</h1>;
    export default Contact;
    ```

1. Install React Router DOM package

    ```bash
    npm i --save react-router-dom
    ```

1. Add named packages from `react-router-dom` and custom components

    ```diff
    import { render } from 'react-dom';
    + import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
    + import About from './components/About';
    + import Contact from './components/Contact';
    import Home from './components/Home';
    ```

1. Wrap everything in `src/index.js` `render()` method in a `Router` tag and create a basic navigation list:

    ```diff
    render(
    + <Router>
        <React.Fragment>
    -     <h1>Hello World!</h1>
    -     <Home />
    +     <nav>
    +       <ul>
    +         <li>
    +           <a href="/">Home</a>
    +         </li>
    +         <li>
    +           <a href="/about">About</a>
    +         </li>
    +         <li>
    +           <a href="/contact">Contact</a>
    +         </li>
    +       </ul>
    +     </nav>
        </React.Fragment>
    + </Router>,
      document.getElementById('app')
    );
    ```

1. Add the _routes_ to `src/index.js`. Routes have at least two attributes, the _path_ and _component_ attributes.

    ```diff
    </nav>

    + <Route path="/" component={Home} />
    + <Route path="/about" component={About} />
    + <Route path="/contact" component={Contact} />
    ```

1. Update the navigation links to use the `Link` component

    ```diff
    <ul>
      <li>
    -   <a href="/">Home</a>
    +   <Link to="/">Home</Link>
      </li>
      <li>
    -   <a href="/about">About</a>
    +   <Link to="/about">About</Link>
      </li>
      <li>
    -   <a href="/contact">Contact</a>
    +   <Link to="/contact">Contact</Link>
      </li>
    </ul>
    ```

1. Add _exact_ attribute to home link

    ```diff
    - <Route path="/" component={Home} />
    + <Route exact path="/" component={Home} />
    ```

1. Add `./src/components/NotFound.js` component to handle any URLs that are not found

    ```javascript
    import React from 'react';

    const NotFound = () => (
      <div>
        <h2>Not Found</h2>
      </div>
    );

    export default NotFound;
    ```

1. Update `./src/index.js` to use `NotFound` component

    ```diff
    <Route path="/contact" component={Contact} />
    + <Route component={NotFound} />
    ```

1. Fix bug where `NotFound` component is omnipresent by using React Router's _Switch_ component

    ```diff
    - import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
    + import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
    // ...
    + <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
    + </Switch>
    ```

### Passing Props Via React Route

If we try to pass a prop directly in a React Route component, it will be ignored. Let's try it, first we'll add a custom prop to our route for the about component.

```javascript
// Will NOT work
<Route
  path="/about"
  component={About} isCustom="hello"
/>
```

Then we have to update our about component, which is currently a stateless functional component.

```diff
- import React from 'react';

- const About = () => <h1>About</h1>;

- export default About;

+ import React, { Component } from 'react';

+ class About extends Component {
+  render() {
+    return <div>{this.props.isCustom}</div>;
+  }
+ }

+ export default About;
```

If we look in the DevTools, the prop is attached to the component, but ignored when we try to render it.

---

TRUE BUT SKIPPED FOR SIMPLICITY'S SAKE

The next idea is to pass component an inline function that creates the element.

```javascript
<Route
  path='/about'
  component={() => <About isCustom={true} />}
/>
```

Though technically this will work, it’s not the best solution. The reason for this is because of performance. According to the officials docs.

> “When you use the component props, the router uses React.createElement to create a new React element from the given component. That means if you provide an inline function to the component attribute, you would create a new component every render. This results in the existing component un-mounting and the new component mounting instead of just updating the existing component.”

So if you’re not supposed to pass a function to component, what’s the solution? Turns out the React Router team predicted this problem and gave us a handy solution. Instead of using component, use the render prop. `render()` accepts a functional component and that function won’t get unnecessarily remounted like with component. That function will also receive all the same props that component would receive. So you can take those and pass those along to the rendered component.

---

The React Router team predicted this problem and gave us a handy solution. Instead of using component, use the render prop. `render()` accepts a functional component and that function won’t get unnecessarily remounted like with component. That function will also receive all the same props that component would receive. So you can take those and pass those along to the rendered component.

```javascript
<Route
  path='/about'
  render={() => <About isCustom="hello" />}
/>
```

- [Reference](https://tylermcginnis.com/react-router-pass-props-to-components/)