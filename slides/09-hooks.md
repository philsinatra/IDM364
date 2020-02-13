build-lists: true
slidenumbers: true
footer: IDM 364: Introduction to React
autoscale: true
theme: Work, 1

![fill](https://reactjs.org/logo-og.png)

---

# Hooks

_Hooks_ are a new feature proposal that lets you use state and other React features without writing a class.

---

## What is a Hook

^ What is a Hook? A Hook is a special function that lets you “hook into” React features. For example, `useState` is a Hook that lets you add React state to function components. We’ll learn other Hooks later.

---

## When would I use a Hook

^ When would I use a Hook? If you write a function component and realize you need to add some state to it, previously you had to convert it to a class. Now you can use a Hook inside the existing function component.

---

## Optional

- completely opt-in
- backwards compatible
- available now

^ (_click_) You can try Hooks in a few components without rewriting any existing code. But you don’t have to learn or use Hooks right now if you don’t want to.

^ (_click_) Hooks don’t contain any breaking changes

^ (_click_) Hooks are currently in an alpha release, and should hopefully be included in React 16.7 after receiving community feedback

---

## Some Available Hooks

- `useState`
- `useEffect`
- `useContext`

^ `useState` will be similar to `setState`, `useEffect` will be similar to _componentDidMount_ and _componentDidUpdate_ life cycle methods. And there's `useContext` and a bunch more, you can review the official documentation on the React website to see all of the possible options and details on when to use them.

---

## Rules of Hooks

- Only call Hooks **at the top level**
- Only call Hooks **from React function components**

^ Hooks are JavaScript functions, but they impose two additional rules.

^ (_click_) Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.

^ (_click_) Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions.

---

## ESLint

```bash
npm install eslint-plugin-react-hooks@next
```

```json
// ESLint configuration
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error"
  }
}
```

^ There is an ESLint plugin called `eslint-plugin-react-hooks` that enforces these two rules. You can add this plugin to your project if you’d like to try it.

---

## Examples

^ _09/react-hooks_