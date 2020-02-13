build-lists: true
slidenumbers: true
footer: IDM 364: Introduction to React
autoscale: true
theme: Work, 1

![fill](https://reactjs.org/logo-og.png)

---

# IDM 364

## Introduction to React

^ React is a UI component library. The UI components are created with React using JavaScript. React UI components are highly self-contained, concern-specific blocks of functionality. There could be components for date pickers, addresses, zip code elements etc. These components have both a visual representation and dynamic logic.

---

## The Problem React Solves

> We built React to solve one problem: building large applications with data that changes over time.

^ The official React website states:

^ The create of React, Jordan Walke, was originally solving a problem at Facebook: having multiple data sources update an autocomplete field. It is difficult to build and manage a complex web UI for front-end applications. React was born to help solve this problem.

---

## What React Is

![left](https://reactjs.org/logo-og.png)

- JavaScript library for building user interfaces
- maintained by Facebook
- base for single-page or mobile applications

^ [^2] _(click)_ React is a JavaScript library for building user interfaces. _(click)_  It is maintained by Facebook and a community of individual developers and companies. _(click)_  React can be used as a base in the development of single-page or mobile applications.

---

## Benefits of React

^ Every new library or framework claims to be better than its predecessors in some respect. Anyone familiar with jQuery? jQuery made it easy to write cross-browser code in native JavaScript. Back then jQuery was considered a framework, but not anymore.

^ Similarly with things like Backbone and then Angular, each new JavaScript framework brings something new to the table and React isn't unique in this. What is new with React is that it challenges some of the core concepts used by most popular front-end frameworks: for example, the idea that you have to have templates.

---

### React vs Other Libraries

- simpler apps
- fast UIs
- less code

^ React is written in pure JavaScript, in a declarative style with powerful, developer-friendly DOM abstractions (and not just DOM, but also iOS, Android etc)

^ React provides outstanding performance thanks to a virtual DOM and a smart-reconciliation algorithm.

^ React's great community and vast ecosystem of components provide developers with a variety of libraries and components.

^ Many features make React simpler to work with than most other front-end frameworks.

---

### Simplicity

- _declarative_ over _imperative_ style
- component-based architecture
- powerful abstractions

^ Simplicity is achieved with:

---

#### Imperative Style Example

```javascript
const arr = [1, 2, 3, 4, 5];
let arr2 = [];

for (let i = 0; i < arr.length; i++) {
  arr2[i] = arr[i]
}

console.log('arr2', arr2);
// arr2 [1, 2, 3, 4, 5]
```

^ Declarative style means developers write how it _should_ be, not what to do step-by-step (imperative). This reduces complexity and makes code easier to read and understand.

^ Consider an example. You need to create an array (`arr2`) whose elements are an exact clone of another array (`arr`). We can use a _for_ loop to iterate over one array and push the values into the new array.

---

#### Declarative Style Example

```javascript
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.map((value) => value);

console.log('arr2', arr2);
// arr2 [1, 2, 3, 4, 5]
```

^ The same logic can be written in a declarative style with the _map_ function.

^ Each element in `arr` is mapped to an arrow function that reads in the value, and returns that value, pushing it into the new array. The output array is the same as the previous example.

---

#### ES6 Declarative Style

```javascript
const arr = [1, 2, 3, 4, 5];
const arr2 = [...arr];

console.log('arr2', arr2);
// arr2 [1, 2, 3, 4, 5]
```

^ Declarative style means we write code how it _should be_ instead of imperative step by step instructions. Using ES6 syntax we can simply say `aar2` should be a clone of `arr`.

---

#### Under The Hood

```javascript
$('#element').attr('aria-expanded', false);
$('#element').class.remove('open');
```

Becomes something like:

```jsx
<div
  aria-expanded={{ariaExpanded}}
  classList={{classes}}
>
```

^ React uses a _virtual DOM_ to find differences between what is already in the browser and the new view that should be displayed. It uses a declarative approach to compose UIs. Developers describe UI elements in a declarative style. A process called _reconciliation of state and view_ is used to keep that data and state of the UI updated. Developers don't need to worry about explicitly changing the view, all they need to do is update the state and React handles the view automatically.

^ With jQuery, you'd have to implement updates imperatively, manipulating the DOM through a series of methods. jQuery itself isn't doing anything, the developer needs to implement all the updates manually. This approach is then prone to mistakes and takes more time to implement.

---

#### Speed and Testability

```jsx
<div>
  <p>{{ content }}</p>

  // update only the text, not the actual element 👌
```

^ Other frameworks may perform unnecessary updates, which makes the performance of complex UIs worse. This is especially noticeable for users when you have a lot of dynamic UI elements on a page.

^ React's virtual DOM exists only in the JavaScript memory. Every time there's a data change, React first compares the differences using its virtual DOM; only when the library knows there has been a change in the rendering will it update the actual DOM.

^ React updates only the parts that are absolutely necessary so that the new virtual DOM and the real DOM (the view) are the same.

---

## React Native

- requires Xcode or Android Studio
- doesn’t use HTML

^ React Native is used for building native applications. The application is coded in React Native, and then _(click)_ imported into Xcode or Android Studio and then compiled into a native app.

^ _(click)_ React-Native doesn’t use HTML to render the app, but provides alternative components that work in a similar way. Those React-Native components map the actual real native iOS or Android UI components that get rendered on the app.

[^1]: [website](https://medium.com/@alexmngn/from-reactjs-to-react-native-what-are-the-main-differences-between-both-d6e8e88ebf24)

---

### React Native Example

```jsx
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.intro}>Hello world!</Text>
      </View>
    );
  }
}
```

---

## ReactJS

- ReactJS is a javascript library
- requires a code bundler
- responsible for the rendering of UI components

^ _(click)_ When you start a new project with ReactJS, you will choose a _(click)_ bundler like Webpack and try to figure out which bundling modules you need for your project. _(click)_ The React code is compiled into JavaScript which then runs in the browser as part of a web site or web based application.

---

### ReactJS Example

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <p>Hello World</p>
      </div>
    );
  }
}

export default App;
```

---

## Hello World

- [react.js](https://unpkg.com/react@16/umd/react.production.min.js)
- [react-dom.js](https://unpkg.com/react-dom@16/umd/react-dom.production.min.js)

^ Let's try an example. In order to get up and running as fast as possible, we need two files. You can download these files, or run them from a content delivery network (CDN). When we start working with an actual dev project, we'll use NPM and Node.js to include these files as local dependencies in our project. For now, we'll load the library files from a CDN.

---

### Loading React Libraries

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Hello World</title>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
</head>
```

---

### App Container

```html
<body>
  <div id="content"></div>
</body>
```

^ In the `body` element, we'll create a `div` container with an ID _content_. This element will be the wrapper for our React web app. You should not render React elements directly in the `body` element; doing so can lead to conflicts with other libraries and browser extensions that manipulate the document body.

---

### Create A React Element

```javascript
React.createElement(elementName, data, child);

// example
const h1 = React.createElement('h1', null, 'Hello world!');
```

^ To create a React element, all you need to do is call `React.createElement(elementName, data, child)` with three arguments.

^ _elementName_: HTML as a string (for example 'h1')

^ _data_: data in the form of properties (for example `{name: 'Azat'}`)

^ _child_: child element or _innerHTML_ (for example 'Hello world!')

---

### Hello World Script

```javascript
ReactDOM.render(
  h1,
  document.getElementById('content')
)
```

^ Once an element is created and stored, you render it to the DOM node/element with the ID _content_ using the `ReactDOM.render()` method.

---

#### Simplify the Script

```javascript
ReactDom.render(
  React.createElement('h1', null, 'Hello world!'),
  document.getElementById('content')
)
```

^ If you prefer, you can move the `h1` to the _render_ call. The result is the same, but you don't need the extra variable. Open the file in your browser and you should see the message displayed on the page.

---

## Benefits of ReactJS

- fast
- modular
- easy debugging
- readable

^ React’s virtual DOM is _(click)_ faster than the conventional full refresh model, since the virtual DOM refreshes only parts of the page. The interesting part is, the team at Facebook wasn’t aware that partially refreshing a page would prove faster. Facebook was just looking for a way to reduce their re-build time, and partial DOM refresh was just a happy consequence. This increases performance and faster programming.

^ _(click)_ You can reuse code components in React JS, saving you a lot of time

^ _(click)_ It improves the debugging speed making your developer’s life easier

^ _(click)_ Even to those unfamiliar with React, it is easily readable. Many frameworks require you to learn an extensive list of concepts which are only useful within the framework. React strives to do the opposite.

[^1]: [website](https://www.cognitiveclouds.com/insights/what-is-the-difference-between-react-js-and-react-native/)

---

## Tools For Getting Started

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com)
- ReactJS Devtools
- [eslint](https://eslint.org)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- reactjavascript language

^ [ReactJS Devtools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

^ [ReactJS Devtools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

---

## Compilers & Packages

- [webpack](https://webpack.js.org)
- [parcel](https://parceljs.org)
- [react-scripts](https://www.npmjs.com/package/react-scripts)
- [babel](https://babeljs.io)

---

## For Next Week

- join IDM Discord server
- Windows users: install [GIT Bash](https://gitforwindows.org)
- install [Node.js](https://nodejs.org/en/) & NPM
- read and review Webpack, Parcel, React-Scripts & Babel sites
- review [command line notes](https://github.com/philsinatra/IDM-T380/blob/master/instructor_materials/02-command_line.md)
- review [git notes](https://github.com/philsinatra/IDM-T380/blob/master/instructor_materials/03-git.md)

---

## References

- [^1]: Mardan, Azat, and John Sonmez. React Quickly Painless Web Apps with React, JSX, Redux, and GraphQL. Manning, 2016. pages 86-91, 94-95, 106-107, 133, 135-137
- [^2]: Wikipedia [https://en.wikipedia.org/wiki/React_(JavaScript_library)](https://en.wikipedia.org/wiki/React_(JavaScript_library)).
