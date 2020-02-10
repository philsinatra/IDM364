# Styled Components

## Project Setup

The following steps can be done ahead of time to save time:

1. Setup project

    ```bash
    npm init react-app styled-components-app

    cd styled-components-app

    rm -rf .git
    ```

1. `.vscode/settings.json`

```json
  {
    "files.associations": {
      "**/*.js": "javascriptreact"
    }
  }
```

1. Update `package.json`

    ```diff
    "scripts": {
    - "start": "react-scripts start",
    + "start": "BROWSER='Firefox Nightly' react-scripts start",
      "build": "react-scripts build",
    ```

We'll work with the default app content for this example. Let's start by creating our own button component.

- `./src/Button.js`

```javascript
import React from 'react';

const Button = () => <button>Hello Button</button>;

export default Button;
```

And then we'll import that component into our `./src/App.js`

```diff
import React from 'react';
+ import Button from './Button';
import logo from './logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
-         <p>
-           Edit <code>src/App.js</code> and save to reload.
-         </p>
+         <Button />
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

export default App;
```

Let's get the app running.

```bash
npm start
```

Normally if we wanted to add styles to the button, we would add a class or two to the element, and the appropriate styles would be applied from our CSS file. This still works fine.

```diff
const Button = () => (
-  <button>Hello Button</button>
+  <button className="button button__large button__large-red">
+    Hello Button
+  </button>
);
```

With styled components, we're actually going to replace the element itself with a custom component that has the styles attached to it. To begin, let's import _styled-components_ in our `./src/Button.js` _Button_ component.

```bash
npm install --save styled-components
```

```diff
import React from 'react';
+ import styled from 'styled-components';
```

So the way this works is we'll setup a variable `MyButton` and set it equal to _styled_ and then select the type of element we want to create (could be a div, heading etc), which in this case will be a button, followed by a set of back ticks. This is called a tag template literal, which works similar to a function.

```diff
+ const MyButton = styled.button`
+  background-color: red;
+  font-size: 200%;
+ `;
```

We can put all of our styles in here. Instead of it being a function and passing arguments to it, it's a string that has been tagged with this specific _styled.button_.

Then we replace the original _button_ element with the new custom component _MyButton_.

```diff
const Button = () => (
-  <button className="button button__large button__large-red">
-    Hello Button
-  </button>
+  <MyButton>Hello Button</MyButton>
);

export default Button;
```

This will create a button HTML element with the styles applied. Let's take a look at the code under the hood in the dev tools.

Next let's take a look at how to deal with a nested element. Let's say our button component includes a `span` with an emoji.

```diff
const MyButton = styled.button`
  background-color: red;
- font-size: 200%;
+ font-size: 100%;
`;

const Button = () => (
-  <MyButton>Hello Button</MyButton>
+  <MyButton>
+    Hello Button <span>💩</span>
+  </MyButton>
);
```

We want the emoji to be larger, so we could setup another style variable.

```diff
+ const MyEmoji = styled.span`
+  font-size: 200%;
+ `;

const Button = () => (
  <MyButton>
-   Hello Button <span>💩</span>
+   Hello Button <MyEmoji>💩</MyEmoji>
  </MyButton>
);
```

This could get our of control quickly, and since we're only using _MyEmoji_ inside of _MyButton_ and not anywhere else where it lives on its own, we can nest the styles in our _MyButton_ styles.

```diff
const MyButton = styled.button`
  background-color: red;
  font-size: 100%;

+ span {
+   font-size: 200%;
+ }
`;

- const MyEmoji = styled.span`
-  font-size: 200%;
- `;

const Button = () => (
  <MyButton>
-    Hello Button <MyEmoji>💩</MyEmoji>
+    Hello Button <span>💩</span>
  </MyButton>
);
```

Tools like SASS and Stylus let you nest your styles this way, so if you're familiar with CSS processors you should feel right at home with this technique. This also makes the code easier to understand. There's no need to give the _span_ a class and add additional bloat to the styles. We only have to be as specific as we need to be.

This works with media queries also.

```diff
const MyButton = styled.button`
  background-color: red;
  font-size: 100%;

+ @media (min-width: 64em) {
+   background-color: blue;
+ }

  span {
    font-size: 200%;
  }
`;
```

Styled components can also have props.

```diff
return (
- <MyButton>
+ <MyButton huge>
    Hello Button <span>💩</span>
  </MyButton>
);
```

Because everything is JavaScript, we have the entire JavaScript language available including if statements, functions etc. I'm going to replace the font size with an interpolated string which allows be to pass in a function.

We'll pass the _props_ into a function, and then write an if statement, checking if _props.huge_ is true, which sets the font size to 200%, otherwise, font size will be 100%.

```diff
const MyButton = styled.button`
  background-color: red;
- font-size: 100%;
+ font-size: ${props => (props.huge ? '200%' : '100%')};

  @media (min-width: 64em) {
    background-color: blue;
  }

  span {
    font-size: 200%;
  }
`;
```

Now we can create multiple instances of our button component and include the _huge_ prop if we want.

```diff
+ <>
   <MyButton huge>
     Hello Button <span>💩</span>
   </MyButton>
+  <MyButton>
+    Hello Button <span>💩</span>
+  </MyButton>
+ </>
```

You can even pass values into the function. Really nice flexibility here.

```javascript
<MyButton huge="100">
```

One of the things that is argued over with this technique is the fact that all of our styles are scoped to our components. This has benefits, but also some draw backs. You could end up repeating yourself a lot, which we want to avoid.

Let's clean up the content in our app a bit, starting with the `./src/App.js` _App_ component.

```diff
import React from 'react';
import Button from './Button';
- import logo from './logo.svg';
- import './App.css';

const App = () => (
  <div className="App">
+    <Button />
-    <header className="App-header">
-      <img src={logo} className="App-logo" alt="logo" />
-      {/* <p>
-        Edit <code>src/App.js</code> and save to reload.
-      </p> */}
-      <Button />
-      <a
-        className="App-link"
-        href="https://reactjs.org"
-        target="_blank"
-        rel="noopener noreferrer"
-      >
-        Learn React
-      </a>
-    </header>
  </div>
);

export default App;
```

Let's get rid of the other CSS in the `./src/index.js` main _index_ file also.

```diff
import React from 'react';
import ReactDOM from 'react-dom';
- import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
```

And we'll get rid of the extra `./src/Button.js` _Button_ instance.

```diff
const Button = () => (
  <MyButton huge>
    Hello Button
    <span role="img" aria-label="poop">
      💩
    </span>
  </MyButton>
);
-       <MyButton>
-         Hello Button{' '}
-         <span role="img" aria-label="poop">
-           💩
-         </span>
-       </MyButton>
```

Next, let's talk about organizing styled components. So far, we're putting the styles right in the JavaScript file where we're using the styles, and that's fine if the styles we're writing are only going to be used for that component.

Sometimes we might write styles that we want to reuse on more than a single component. If that's the case, we probably want to put the styles in a separate file and then export it so we can reuse it through the application.

What I normally do is write the styles right in the component file, and then if I find I want to reuse the styles somewhere else, I'll refactor the styles into a separate file and export it.

You can make a folder in your _components_ folder, something like _styles_ and put all of your styled components in there. You can make subfolders in there if you choose. You can basically organize your files any way you want. Try to keep it simple and easy to follow. The technique you choose probably will depend on the size of your project.

To get started, let's look at our `./src/App.js` _App_ component and replace the generic _div_ with more of a styled page container.

```diff
import React from 'react';
import Button from './Button';
+ import styled from 'styled-components';

+ const StyledPage = styled.div`
+  background-color: white;
+  color: #111;
+ `;

const App = () => (
-  <div className="App">
+  <StyledPage className="App">
+    <p>
+      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis esse exercitationem aperiam voluptatum libero earum dolorem officia cumque rem recusandae!
+    </p>
    <Button />
-    </div>
+  </StyledPage>
);
```

Let's add a container to handle centering and maintaining the max width of our content.

```diff
const StyledPage = styled.div`
  background-color: white;
  color: #111;
`;

+ const Inner = styled.div`
+   max-width: 62.5rem;
+   margin: 0 auto;
+   padding: 2rem;
+   box-shadow: box-shadow: 0 12px 24px 0 rgba(0,0,0,.09);
+ `;

const App = () => (
  <StyledPage className="App">
+   <Inner>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis esse exercitationem aperiam voluptatum libero earum dolorem officia cumque rem recusandae!
      </p>
      <Button />
+   </Inner>
  </StyledPage>
);
```

Next, let's see how we can take these hard coded values we're using for our widths and colors, and put them into a theme.

Styled component uses the concept of themes and themes are just objects that include all of the values you want to use throughout your application.

Let's create a theme object with some styles.

```javascript
const theme = {
  red: '#ff0000',
  black: '#111111',
  gray: '#3a3a3a',
  maxwidth: '62.5rem',
  bs: '0 12px 24px 0 rgba(0,0,0,.09)'
}
```

Note that this isn't a styled component, it's a JavaScript object, so each of the values is a string that needs to have quotes around it.

In order to use our theme values, we're going to have to import two additional packages from the _styled-components_ package. The first is _ThemeProvider_.

```diff
- import styled from 'styled-components';
+ import styled, {ThemeProvider} from 'styled-components';
```

Next we're going to wrap the entire application in the _ThemeProvider_

```diff
return (
+ <ThemeProvider>
    <StyledPage className="App">
      <Inner>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis esse exercitationem aperiam voluptatum libero earum dolorem officia cumque rem recusandae!
        </p>
        <Button />
      </Inner>
    </StyledPage>
+ </ThemeProvider>
);
```

This is going to use the React Context API to specify values up high, like our theme, and then any child can access those values without having to pass down values from component to component.

The _ThemeProvider_ expects you to pass it a _theme_ object, and the value is going to be our actual object also called _theme_.

```diff
return (
- <ThemeProvider>
+ <ThemeProvider theme={theme}>
    <StyledPage className="App">
```

To use our theme values, we can replace the hard coded values with our theme object values. We're in back ticks here, so we can use template literals. We have to pass in a function, so we'll use an arrow function that passes in our props, and then we have access to our theme using `props.theme.value` props dot theme dot and then the value we want to access.

```diff
const Inner = styled.div`
- max-width: 62.5rem;
+ max-width: ${props => props.theme.maxwidth};
+ background-color: ${props => props.theme.red};
  margin: 0 auto;
  padding: 2rem;
`;
```

Let's add a header to our application. We'll create a new file `./src/Header.js` _Header.js_

```javascript
import React from 'react';

const Header = () => (
  <div>
    <div className="bar">
      <h1>Store Name</h1>
    </div>
  </div>
);

export default Header;
```

Now we'll add the _Header_ to our `./src/App.js` _App_ component.

```diff
import React from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Button from './Button';
+ import Header from './Header';

...

<ThemeProvider theme={theme}>
<StyledPage className="App">
  <Inner>
+   <Header />
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
```

Next we want to style up the `h1` tag in the _Header_ component to be more of a logo.

```diff
import React from 'react';
+ import styled from 'styled-components';

+ const Logo = styled.h1`
+   color: white;
+   font-size: 4rem;
+   margin-left: 2rem;
+   padding: 1rem;
+   text-align: center;
+   transform: skew(-7deg);
+ `;

const Header = () => (
  <div>
    <div className="bar">
-     <h1>Store Name</h1>
+     <Logo>Store Name</Logo>
    </div>
  </div>
);

export default Header;
```

Let's pull a theme value from our theme object. We'll set the background color to our red value.

```diff
const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  transform: skew(-7deg);
+ background-color: ${props => props.theme.red};
`;
```

Notice how we didn't have to pass the theme value into the child component here 👍

While we're add it, let's throw in a media query.

```diff
const Logo = styled.h1`
  color: ${props => props.theme.white};
  font-size: 4rem;
  margin-left: 2rem;
  padding: 1rem;
  text-align: center;
  transform: skew(-7deg);
  background-color: ${props => props.theme.red};

+ @media (min-width: 81.25em) {
+   text-align: left;
+ }
`;
```

Let's add another styled component for the header.

```diff
const Logo = styled.h1`
  color: ${props => props.theme.white};
  font-size: 4rem;
  margin-left: 2rem;
  padding: 1rem;
  text-align: center;
  transform: skew(-7deg);
- background-color: ${props => props.theme.red};

  @media (min-width: 81.25em) {
    text-align: left;
  }
`;

+ const StyledHeader = styled.header`
+   .bar {
+     background-color: ${props => props.theme.black};
+
+     @media (min-width: 81.25em) {
+       background-color: ${props => props.theme.red};
+     }
+   }
+ `;

const Header = () => (
- <div>
+ <StyledHeader>
    <div className="bar">
      <Logo>Store Name</Logo>
    </div>
- </div>
+ </StyledHeader>
);
```

So you can see how flexible the styles can be when we need to style nested elements. Next, let's look at how we can use the cascade in CSS to apply some high level styles and have those styles inherit down into child components, like we're use to having happen in our .css files.

Things like colors, typography, resetting margins and paddings etc. are all styles we want to apply globally and have available throughout our application without having to reapply every time we build a custom component.

## Global Styling

It's a little odd how we do this. We're going to use the _createGlobalStyle_ API.

Let's go to our `./src/App.js` _App_ component and create a _createGlobalStyle_ variable.

```diff
import React from 'react';
- import styled, { ThemeProvider } from 'styled-components';
+ import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Button from './Button';
import Header from './Header';

const theme = {
  red: '#ff0000',
  black: '#111111',
  gray: '#3a3a3a',
  maxwidth: '62.5rem',
  bs: '0 12px 24px 0 rgba(0,0,0,.09)'
};

+ const GlobalStyle = createGlobalStyle`
+   html {
+     box-sizing: border-box;
+     font-size: 100%;
+
+     @media screen and (min-width: 64em) {
+       font-size: 150%;
+     }
+   }
+
+   *, *:before, *:after {
+     box-sizing: inherit;
+   }
+
+   body {
+     font: 100%/1.5 sans-serif;
+     margin: 0;
+     padding: 0;
+   }
+ `;

const StyledPage = styled.div`
  background-color: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxwidth};
  margin: 0 auto;
  padding: 2rem;
`;

const App = () => (
+     <>
+       <GlobalStyle />
        <ThemeProvider theme={theme}>
          <StyledPage className="App">
            <Inner>
              <Header />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis esse exercitationem aperiam voluptatum libero earum dolorem officia cumque rem recusandae!
              </p>
              <Button />
            </Inner>
          </StyledPage>
        </ThemeProvider>
+     </>
    );

export default App;
```

Let's apply some additional global styles.

```diff
const theme = {
  red: '#ff0000',
  black: '#111111',
  gray: '#3a3a3a',
  maxwidth: '62.5rem',
  bs: '0 12px 24px 0 rgba(0,0,0,.09)',
+ colorLight: 'hsl(109, 100%, 100%)',
+ colorDark: 'hsl(211, 2%, 16%)'
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 100%;

    @media screen and (min-width: 64em) {
      font-size: 150%;
    }
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
+   background-color: ${theme.colorLight};
+   color: ${theme.colorDark};
    font: 100%/1.5 sans-serif;
    margin: 0;
    padding: 0;

+   @media (prefers-color-scheme: dark) {
+     background-color: ${theme.colorDark};
+     color: ${theme.colorLight};
+   }
  }
`;

const StyledPage = styled.div`
- background-color: white;
- color: ${props => props.theme.black};
`;
```

Now let's test our application in a couple of browsers.

Let's move the styles for our _Button_ component into a separate style file. We'll create `./src/styles/ButtonStyles.js` _ButtonStyles.js_ in a new _styles_ folder, and cut/paste the styles from `./src/Button.js` our _Button_ component into this file.

```javascript
import styled from 'styled-components';

const MyButton = styled.button`
  background-color: red;
  font-size: ${props => (props.huge ? '200%' : '100%')};

  @media (min-width: 64em) {
    background-color: blue;
  }

  span {
    font-size: 200%;
  }
`;

export default MyButton;
```

Then we'll clean up `./src/Button.js` our _Button_ compontent.

```diff
import React from 'react';
- import styled from 'styled-components';
+ import MyButton from './styles/ButtonStyles';

- const MyButton = styled.button`
-   background-color: red;
-   font-size: ${props => (props.huge ? '200%' : '100%')};
-
-   @media (min-width: 64em) {
-     background-color: blue;
-   }
-
-   span {
-     font-size: 200%;
-   }
- `;

const Button = () => (
  <MyButton huge>
    Hello Button
    <span role="img" aria-label="poop">
      💩
    </span>
  </MyButton>
);

export default Button;
```
