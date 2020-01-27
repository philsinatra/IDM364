build-lists: true
slidenumbers: true
footer: IDM 364: Introduction to React
autoscale: true
theme: Dark Mode

![fit](https://reactjs.org/logo-og.png)

---

# React Basics

---

## Baby Steps

^ We'll get started with some baby steps to lay the foundation for the rest of our lessons. We are going to focus first on understanding concepts such as elements and components.

---

## Review

```javascript
let linkElement = React.createElement(
  'a',
  { href: 'http://example.com' },
  'Example Website'
)
```

^ Recall from last time how we can create a React element using the `React.createElement()` method. The problem though is that most UIs have more than one element. As UIs get more complex, we need to create structure in a hierarchical manner by nesting elements.

---

### `ReactDOM.render()`

```javascript
let h1 = React.createElement('h1', null, 'Hello world!');

ReactDOM.render(
  h1,
  document.getElementById('content')
);
```

^ `ReactDOM.render()` only takes one element as an argument.

---

### Multiple Parameters

```javascript
ReactDOM.render(
  React.createElement('div', null, h1, h1),
  document.getElementById('content')
)
```

^ You can pass unlimited number of parameters to `createElement()`; all the parameters after the second become child elements, which are siblings (on the same level).

^ _modify 01/helloworld.html example_

---

## Creating Component Classes

```javascript
let h1 = React.createElement('h1', null, 'Hello world!');

class HelloWorld extends React.Component {
  render() {
    return React.createElement('div', null, h1, h1)
  }
}

ReactDOM.render(
  React.createElement(HelloWorld, null),
  document.getElementById('content')
)
```

^ After nesting elements with React, you'll run into another problem: there are a lot of elements. We want to be able to reuse code by separating the functionality into loosely coupled parts. This is were _components_ come into play.

^ Let's say we use Hello World in 10 different projects. By separating Hello World into its own class, it is a modular piece that can be reused in multiple places and projects.

---

### Extending `React.Component`

```javascript
class HelloWorld extends React.Component {
  render() {
    // must return a single React element
    return React.createElement('div', null, h1, h1);
  }
}
```

^ You create a React component class by extending the `React.Component` class, using _class CHILD extends PARENT_ ES6 syntax. The one mandatory thing you must implement for this new class is the `render()` method, which _must_ return a single React element.

---

### Refactored Gains

```javascript
ReactDOM.render(
  React.createElement(
    'div',
    null,
    React.createElement(HelloWorld),
    React.createElement(HelloWorld),
    React.createElement(HelloWorld)
  )
)
```

^ It may not be clear what is being gained here. What if you need to print more Hello World statements? You can do so by reusing the `HelloWorld` component multiple times and wrapping them in a `div` container.

---

## Working With Properties

- render HTML attributes (`href`, `style`, `class` etc)
- in JavaScript code via `this.props` values

^ Properties closely resemble HTML attributes. They can be used for this purpose, but we can use the properties of an element in our code any way we want.

---

### Hello World Props

- `id`: standard attribute `id`
- `frameworkName`: not a standard attribute
- `title`: standard attribute `title`

^ To better understand this, let's modify the `HelloWorld` component with props. The goal is to reuse the `HelloWorld` component so that each instance of the class renders different text and HTML attributes. We'll enhance the component with three properties:

^ Standard attributes will be mapped to the HTML attribute equivalent automatically (in this example, `id` and `title`), where custom attributes will be passed as a custom property, and be available to us inside the component's `render()` method.

^ _02/helloworld-props.html_

---

![fit](https://media.giphy.com/media/tf9j98QUJrdAs/giphy.gif)

---

## References

- [^1]: Mardan, Azat, and John Sonmez. React Quickly Painless Web Apps with React, JSX, Redux, and GraphQL. Manning, 2016. pages 153, 155, 162, 166, 180-183, 188-189, 194, 202-203, 208-209
