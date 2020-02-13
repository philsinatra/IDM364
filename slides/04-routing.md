build-lists: true
slidenumbers: true
footer: IDM 364: Introduction to React
autoscale: true
theme: Work, 1

![fill](https://reactjs.org/logo-og.png)

---

# React Routing

^ So far everything we've been building has been within a single view. As applications get more complex, the view will need to change dramatically, loading different components with various states in and out. In the past, in many applications the URL rarely changed as users progress through the app. Only the content area changed.

---

## Consequences

- refresh browser = restart application
- browsing history not recorded properly
- can't share
- SEO 😢

^ This approach had some negatives.

^ (_click_) Refreshing the browser took the user back to the original view of the application.

^ (_click_) Clicking the back button on the browser may take you to a completely different site.

^ (_click_) Sharing a precise page within the app wasn't possible.

^ (_click_) Search engines couldn't index the site because there were no legit URLs.

---

## Browser URL Routing

^ Fortunately, today we have browser URL routing. URL routing lets you configure an application to accept request URLs that don’t map to physical files. Instead, you can define URLs that are semantically meaningful to users, that can help with search-engine optimization (SEO), and that can reflect your application’s state.

---

### Example URL

`https://mywebsite.com/books/jsreact`

^ This URL is for a page that displays information about a book. Behind the scenes, we are using a single page app and the URL maps to a view that displays information about a product with the id _jsreact_. You can browse other products, the URL can change and both the browser and search engines would work as you'd expect, but the site would still be run through a React application.

---

## Routing From Scratch

```javascript
updateHash(event) {
  this.setState({hash: window.location.hash})
}
componentDidMount() {
  window.addEventListener('hashchange', this.updateHash, false)
}
componentWillUnmount() {
  window.removeEventListener('hashchange', this.updateHash, false)
}
```

^ To implement a routing system, we can take advantage of the React lifecycle methods to listen for changes to the window location. We would also keep track of the changes in a one form or another so we could manage the browsing history. While all of this is possible, this is one case where we can take advantage of some of the available tools to make our lives easier.

---

## React Router

^ React Router isn't part of the official React core library. It actually came from the working community, but it is popular enough that it is used in over one third of React projects.

---

### React Router JSX Example

```javascript
updateHash(event) {
  this.setState({hash: window.location.hash})
}
componentDidMount() {
  window.addEventListener('hashchange', this.updateHash, false)
}
componentWillUnmount() {
  window.removeEventListener('hashchange', this.updateHash, false)
}
```

^ We'll use JSX to create a `Route` for each page, and nest the routes inside of a `Router`.

---

### Route Properties

- _path_
- _component_
- `props.route`

^ Each route has at least two properties. (_click_) Path, which is the URL pattern to match to trigger the route, (_click_) and _component_ which fetches and renders the correct component. You can have more properties if needed, (_click_) and they would all be accessible via  `props.route` in the `Route` component.

---

## React Router Example

^ _04/router_

---

## References

[^1]: Mardan, Azat, and John Sonmez. React Quickly Painless Web Apps with React, JSX, Redux, and GraphQL. Manning, 2016. pages 807-809, 819