build-lists: true
slidenumbers: true
footer: IDM 364: Introduction to React
autoscale: true
theme: Work, 1

![fill](https://reactjs.org/logo-og.png)

---

# Introducing JSX

^ One of the things we mentioned as a benefit to React is its simplicity and easiness to read. That last example doesn't look very easy to read, or maintain for that matter. Now it's time to look at JSX, one of the best things about React (in my opinion).

^ JSX is a JavaScript extension that provides syntactical sugar for function calls and object construction. It may look like a template engine or HTML, but it isn't. JSX produces React elements while allowing you to harness the full power of JavaScript. It is not required for React, but it is highly recommended by React's creators.

---

## Hello World & A Link

```javascript
React.createElement(
  'div',
  null,
  React.createElement(HelloWorld, null),
  React.createElement(
    'a',
    { href: 'http://example.com' },
    'Example Website'
  )
)
```

---

### Hello World & A Link - JSX

```jsx
<div>
  <HelloWorld />
  <a href="http://example.com">Example website</a>
</div>
```

^ To demonstrate the eloquence of JSX, here is the code to create `HelloWorld` and a link element:

^ JSX is a small language with an XML-like syntax, but it has changed the way people write UI components. Previously developers wrote HTML and JavaScript code for the controllers and views, jumping between various files. With JSX, the JS and HTML are tightly coupled to implement various pieces of functionality.

^ It looks like regular HTML and is easier to read and write.

---

## JSX ➡️ Browser

1. Write JSX code
1. Run JSX through transpiler
1. Save vanilla JavaScript file
1. Load `.js` in browser

---

## Creating Element With JSX

```javascript
React.createElement(
  name,
  { key: value, ... },
  child
)
```

Becomes:

```jsx
<name key=value>
  <child />
</name>
```

^ Instead of writing the top example, we can use JSX, where the attributes and their values come from the second argument of the `createElement()` method.

---

### HelloWorld Review

```javascript
ReactDOM.render(
  React.createElement('h1', null, 'Hello world!'),
  document.getElementById('content')
)
```

---

### HelloWorld JSX

```jsx
ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById('content')
)
```

^ The JSX version is much more compact.

---

## Working With JSX In Components

```jsx
class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('content')
);
```

^ The previous example used the `h1` JSX tag, which is also a standard HTML tag name. When working with components, you apply the same syntax. The only difference is that the component class name must start with a capital letter. Let's rewrite `HelloWorld` using JSX:

---

## Outputting Variables In JSX

```jsx
class DateTimeNow extends React.Component {
  render() {
    let dateTimeNow = new Date().toLocaleString();
    return <span>Current date and time is {dateTimeNow}.</span>
  }
}
```

^ You want your component to be smart enough to change the view based on some code. For example, a current date-time component should use the actual current date and time, not a hard coded value.

^ In JSX, you can use curly braces notation to output variables dynamically.

---

## Working With Properties In JSX

^ You can pass properties in JSX as you would in normal HTML. You also render standard HTML attributes by setting element properties.

---

### Hard Coded Properties

```jsx
ReactDOM.render((
  <div>
    <a href="http://reactjs.org">ReactJS</a>
  </div>
  ), document.getElementById('content')
)
```

^ Using hard coded values for attributes isn't flexible. If you want to reuse the component, the `href` must change to reflect a different address each time. So we need a component that can use dynamic values for attributes.

---

### Flexible Properties

```jsx
class ProfileLink extends React.Component {
  render() {
    return (
      <a
        href={this.props.url}
        title={this.props.label}
      >
        {this.props.displayText}
      </a>
    )
  }
}
```

^ In this example there are three dynamic values that allow this component to be reused to generate a link with a unique `href`, `title` and display text. Where do these properties come from?

---

### Properties

```jsx
<ProfileLink
  url='http://profile.com'
  label='Profile for user'
  displayText='go to profile'
/>
```

^ The properties are defined when the component is created. These properties are passed to the class, and accessed via `this.props` followed by the property name you want to access.

---

### JSX HelloWorld Props Refactor

```jsx
ReactDOM.render(
  <div>
    <HelloWorld
      id='ember'
      frameworkName='Ember.js'
      title='A framework for creating ambitious web applications.'
    />,
    ...
  </div>
)
```

^ Let's compare our Hello World example with props with this updated version of the code that uses JSX syntax.

---

## Creating Component Methods

```jsx
class Content extends React.Component {
  getURL() {
    return 'http://webapplog.com'
  }
  render() {
    ...
  }
}
```

^ As a developer, you're free to write any component methods for your application. Here's a simple example. You can use the `getURL()` method within your other class methods.

---

### `getURL()` Method

```jsx
class Content extends React.Component {
  getURL() {
    return 'http://webapplog.com'
  }
  render() {
    return(
      <div>
        <a href={this.getURL()}>
          {this.getURL()}
        </a>
      </div>
    )
  }
}
```

^ To output the return from a custom method in JSX, use the curly braces just like you would with variables. Access the method using the `this` keyword, followed by the method name and a set of parenthesis which will invoke the method.

^ You can see we're invoking the component method directly in JSX.

---

## if/else in JSX

```jsx
...
render() {
  if (this.props.user.session)
    return <a href="/logout">Sign Out</a>
  else
    return <a href="/login">Sign In</a>
}
...
```

^ Since we're working with JavaScript, we can use logic to change our views based on the results of conditional statements.

---

## JSX Comments

```jsx
let content = (
  <div>
    {/* this is a comment */}
  </div>
)
```

^ Comments in JSX are similar to comments in regular JavaScript, but you have to wrap standard JavaScript comments in curly braces.

---

## Setting Up A JSX Transpiler

- [Babel CLI](https://babeljs.io)
- [Node.js](https://nodejs.org/en/)
- Build tool
  - [webpack](https://webpack.js.org)
  - [parcel](https://parceljs.org)
  - [gulp](https://gulpjs.com)
  - [grunt](https://gruntjs.com)

^ Now you've had a taste of the basics of JSX. In order to execute JSX, you need to convert it to regular JavaScript code. This process is called _transpilation_. There are various tools available for this job. All of these are really Babel in one way or another. Babel is the recommended tool for this process.

---

### Required Tools

- Node
- NPM or Yarn
- babel-cli
- babel-preset-react

^ Node and NPM (or Yarn) need to be installed globally, while Babel CLI and the React preset will be local dependencies of your project.

---

#### Check Installations

```bash
node -v
npm -v
```

---

## Let's Build A Project

^ _02/project-a/README.md_

---

[.build-lists: false]

## Our First ReactJS Project

- [Create React App](https://github.com/facebook/create-react-app)

^ We'll get started with our first web application by taking advantage of the _Create React App_ script. There are many benefits to this technique. For us as beginners, the biggest advantage is it lets us jump right into React without have to deal with all of the tooling and configuration related to setting up a bundler like Webpack by hand.

---

### Webpack Config Example

```javascript
module: {
strictExportPresence: true,
rules: [
  { parser: { requireEnsure: false } },
  {
    test: /\.(js|mjs|jsx)$/,
    enforce: 'pre',
    use: [
      {
        options: {
          formatter: require.resolve('react-dev-utils/eslintFormatter'),
          eslintPath: require.resolve('eslint'),

        },
        loader: require.resolve('eslint-loader'),
      },
    ],
    include: paths.appSrc,
  },
```

^ A sample configuration file is in the examples folder: _02/webpack.config.dev.sample.js_

---

[.build-lists: false]

## Create React App - Init

- [Creating an App](https://github.com/facebook/create-react-app#creating-an-app)

```bash
npx create-react-app my-app
npm init react-app my-app
yarn create react-app my-app
```

^ You don’t need to install or configure tools like Webpack or Babel. They are preconfigured and hidden so that you can focus on the code. Just create a project, and you’re good to go.

^ To create a new app, you may choose one of the following methods:

---

### NPM Init

```bash
npm init react-app my-app
```

^ Let's create an app using the `npm` method. Once the setup is complete, we'll take a look at the files that are created for us.

---

### Default Tasks

- `npm start`
- `npm test`
- `npm run build`
- `npm run eject`

^ Let's review the details of what each of these tasks will do. All of the details are outlined in the `README.md` file that was created for us.

---

### `package.json` Tasks

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

^ If we open up the `package.json` file in our app folder, we'll see these tasks listed in the `scripts` section of the JSON.

---

## Start Our App

```bash
npm start
```

^ This script runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will automatically reload if you make changes to the code. You will see the build errors and lint warnings in the console.

---

### Change Development Browser

```json
"start": "react-scripts start"
```

Becomes

```json
"start": "BROWSER='Firefox Nightly' react-scripts start"
```

^ By default, the application will open on port 3000, in your default browser. For me, Safari is my default browser, but for development work, I prefer Firefox, specifically Firefox's nightly build. You can customize everything about the application development scripts including which port is used and the browser that opens by default. In this case, I'm changing the development browser to Firefox Nightly.

---

## Edit Our App

^ Let's take a look at the source code for the default app.

^ _Set reactjavascript language in VSCode_

^ _Make some changes to the code_

^ _Force an error_

^ _React DevTools_

---

## Build Our Own App

^ _02/project-b_

---

## For Next Week

---

## References

[^1]: Mardan, Azat, and John Sonmez. React Quickly Painless Web Apps with React, JSX, Redux, and GraphQL. Manning, 2016. pages 153, 155, 162, 166, 180-183, 188-189, 194, 202-203, 208-209