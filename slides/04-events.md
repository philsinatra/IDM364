build-lists: true
slidenumbers: true
footer: IDM 364: Introduction to React
autoscale: true
theme: Work, 1

![fill](https://reactjs.org/logo-og.png)

---

# Handling Events

^ Up to this point we've been building and rendering interfaces that have zero interaction. Next we're going to look at dealing with user interaction; responding to actions like a user clicking and dragging a mouse.

---

## DOM Events

```javascript
const element = document.getElementById('myElement');
element.addEventListener('click', clickHandler);
```

^ Recall how we can setup event listeners in JavaScript that will call a function or method when triggered. Also remember that in React, we're trying to not directly effect the DOM. Instead we'll use React to implement and execute events based on user interaction with our applications.

---

## DOM Events in React

```javascript
onClick={function() {...}}
// OR
onClick={() => {...}}
```

^ We can respond to user actions by defining event handlers for these actions, which we do by defining the event handler as the value of an element attribute in JSX. For attributes that are event names, we use standard W3C DOM event names in camelCase, such as `onClick` or `onMouseOver`.

---

### Binding Events

```javascript
<button onClick={(function(event) {
  console.log(this, event)
}).bind(this)}>
  Save
</button>
```

^ Here's an example of an event listener that's triggered when a user clicks a button. In the event listener, we're logging the `this` context.

^ `bind()` is needed so that in the event handler function, you get a reference to the instance of the React element. If you don't use bind, `this` will be null.

---

### No Bind

- no reference to `this`
- using older style `React.createClass()` method
- using fat arrow functions 👍

^ You don't need to bind the context to the class (React element) using `bind(this)` when:

^ (_click_) you don't need to refer to this class by using `this`

^ (_click_) you're using the older style `React.createClass()` instead of the ES6+ class style

^ (_click_) your using fat arrows

---

### Refactor Our Button

[.code-highlight: 4-6]

```javascript
<button onClick={(function(event) {
  console.log(this, event)
}).bind(this)}>
<button onclick={(event) => {
  console.log(this, event)
}}>
  Save
</button>
```

---

## Supported DOM Events

[Supported Events](https://reactjs.org/docs/events.html#supported-events)

---

## React is Declarative

```javascript
// jQuery: imperative
$('.btn').click(handleSave);

// React: declarative
<button
  className="btn"
  onClick={handleSave}
> Save </button>
```

^ Let's build an example _examples/04/event\_handling_

---

## References

[^1]: Mardan, Azat, and John Sonmez. React Quickly Painless Web Apps with React, JSX, Redux, and GraphQL. Manning, 2016. pages 430-433, 439