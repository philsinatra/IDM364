build-lists: true
slidenumbers: true
footer: IDM 364: Introduction to React
autoscale: true
theme: Work, 1

![fill](https://reactjs.org/logo-og.png)

---

# Persisting State

^ As we work with our applications, we're loading data, changing the view, passing props, setting and updating the state. One thing we haven't addressed is persisting the changes we're making to the application. If our user hits the refresh button, everything restarts, which is not ideal. Imagine you're shopping online and hitting the refresh or back button in the browser restarted the app and your shopping cart was emptied.

---

## Persisting State Options

- database
- state management library (Redux, MobX)
- local/session storage

^ Once the app starts, we want to store component state so that the user can interact without worrying about having to start over on a refresh, or if the user wants to work with our app a bit and then come back later and finish.

^ (_click_) Obviously it would be possible by having a backend to persist it in a database. Once the app starts, the React app would make a request to the backend to retrieve the state. (_click_) Then it could be stored in the local component state or in a state container of a state management library like Redux or MobX.

^ (_click_) Another option could be to use the native local storage of the browser. There is no backend and no additional library needed.

---

## Choosing A Solution

^ Each of these options are valid depending on the situation. In some cases, a combination of both options is also ideal. Let's think about an example, an online order form. Perhaps the items available for purchase could be stored in a database, and the content in the user's shopping cart could be stored via local storage. What are the benefits or drawbacks of this type of scenario?

---

## Local Storage Example

```javascript
addToCart = (newItem) => {
  const cart = [...this.state.cart];

  cart.push[newItem];
  this.setState({ cart });

  localStorage.setItem(key, JSON.stringify(cart));
}
```

^ Here's a simple example that takes the new item being added to a shopping cart and adds it to the current state of the component. The last line also takes that shopping cart array and stores it in local storage. We could then write a function that checks for the existence of that local storage key when the component loads and sets the shopping cart up based on that data.

^ Even if the user hits the refresh button, the data will still be available. When the user completes the purchase, we clear the state of the shopping cart, and this local storage key.

---

## Firebase Example

^ Let's build a real life example.

^ _05/persisting\_state_