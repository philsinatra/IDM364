build-lists: true
slidenumbers: true
footer: IDM 364: Introduction to React
autoscale: true
theme: Work, 1

![fill](https://reactjs.org/logo-og.png)

---

# Styled Components

^ There's a few ways to deal with CSS in a React application. You can do it the way you've always done it with a separate CSS file. You can use pre-processors like SASS, LESS or Stylus.

---

## CSS Import

```javascript
const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="screen.css" />
    <title>My App</title>
  </Head>
)
```

---

## CSSnJS

^ There is a fairly popular way of writing CSS in React application that's sort of got the name CSS in JS. Essentially, what that means is you are writing the styles for your application inside of your JavaScript application, and usually they're fairly coupled with the actual components that need to be created. So, if I have a button that needs to be red and white text and a certain font size, I might couple that with the actual button itself because they go together.

---

## Benefits of CSSnJS

^ If you write a specific styles for that button, there's no way for it to leak outside and maybe accidentally apply those styles to something else. Have you ever written some CSS where you applied a class to something or you wrote a selector based on an element and then something else on the page broke because the styles accidentally applied to that? With this, we're really going to be containing our styles.

---

## CSSnJS Styled Components

- flexible
- easy to setup/work with
- looks like normal CSS

^ There are a bunch of options for this technique. Each has their own syntax and setup. The one we'll be looking at is called _Styled Components_. I like this one the best because I think it's very _(click)_ flexible, _(click)_ easy to setup and work with, and the code you write _(click)_ looks like normal CSS which we're all comfortable with.

---

## [VSCode Styled Components Extension](https://marketplace.visualstudio.com/items?itemName=mf.vscode-styled-components)

^ So, let's take a look at how this actually works. First of all, before you even get started, make sure that you have a, if you're using VS Code, grab the VS code styled components extension and what that's going to do is it's going to give you regular CSS highlighting inside of our JavaScript files.

^ _08/styled-components-app_