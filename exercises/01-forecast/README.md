# Forecast Exercise

1. Setup new project
1. Review slideshow

- 1 hour to complete
- 5 points towards final grade

## Solution

1. Setup project

      ```bash
      npm init react-app forecast

      cd forecast

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
      + "start": "BROWSER='Google Chrome Canary' react-scripts start",
      ```

1. Set `public/index.html`

      ```html
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Forecast</title>
      </head>

      <body>
          <noscript>You need JavaScript to run this application.</noscript>
          <div id="app"></div>
      </body>

      </html>
      ```

1. Create `./src/index.js`

      ```javascript
      import React from 'react';
      import ReactDOM from 'react-dom';

      const App = () => {
        return <div>Hi there</div>;
      };

      ReactDOM.render(<App />, document.querySelector('#app'));
      ```

1. Create `./src/components/SeasonDisplay.js`

    ```javascript
    import React from 'react';

    const SeasonDisplay = () => {
      return <div>Season Display</div>;
    };

    export default
    ```

## Determine A User's Physical Location

This will be rather straight forward. We can accomplish this using an API that is available in most modern browsers.

- [Mozilla Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

1. In `./src/index.js`, make a call to the Geolocation API. We'll primarily use the latitude information that is reported to determine if the user is in the northern or southern hemisphere.

    ```diff
    const App = () => {
    + window.navigator.geolocation.getCurrentPosition(
    +   position => console.log(position),
    +   err => console.log(err)
    + );

      return <div>Hi there</div>;
    };
    ```

## Debugging Location In Chrome

Review Chrome settings for handling user permissions.

## Handling Async Operations With Functional Components

We're going to use the latitude to determine if the user is in the northern or southern hemisphere. Our first goal is to simply display the latitude value in the browser.

Some times it may take a few seconds for the geolocation function to get the user's location data. This will cause an issue if our component tries to render HTML/JSX including the location information, which is not available. We're going to have to wait until the information is available before trying to display it. So we'll need our lifecycle methods, which means we have to refactor this functional component into a class based component.

## Refactor to Class Component

```diff
- const App = () => {
-   window.navigator.geolocation.getCurrentPosition(
-     position => console.log(position),
-     err => console.log(err)
-   );
-
-   return <div>Hi there</div>;
- };

+ class App extends React.Component {
+   render() {
+     window.navigator.geolocation.getCurrentPosition(
+       position => console.log(position),
+       err => console.log(err)
+     );
+
+     return <div>Latitude:</div>;
+   }
+ }
```

## Add State

```diff
class App extends React.Component {
+  state = {
+    lat: null
+  };

  render() {
    window.navigator.geolocation.getCurrentPosition(
      position => console.log(position),
      err => console.log(err)
    );

-   return <div>Latitude: </div>;
+   return <div>Latitude: {this.state.lat}</div>;
  }
}
```

We're currently getting the user's current position from the call inside the render method. Doing this is expensive because the render method is called frequently. Instead, we want to get the user's location when our app component is first initialized.

```diff
class App extends React.Component {
-  state = {
-    lat: null
-  };

+ constructor(props) {
+   super(props);

+   this.state = { lat: null };

+   window.navigator.geolocation.getCurrentPosition(
+     position => console.log(position),
+     err => console.log(err)
+   );
+ }

  render() {
    window.navigator.geolocation.getCurrentPosition(
      position => console.log(position),
      err => console.log(err)
    );

   return <div>Latitude: {this.state.lat}</div>;
  }
}
```

## Update State Property

The first function call in the `getCurrentPosition` function is a callback, it is called once the geolocator has successfully gathered the user position. Update that function to do more than a console log.

```diff
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { lat: null };

    window.navigator.geolocation.getCurrentPosition(
-     position => console.log(position),
+     position => {
+       this.setState({ lat: position.coords.latitude });
+     },
      err => console.log(err)
    );
  }

  render() {
    return <div>Latitude: {this.state.lat}</div>;
  }
}
```

## Handling Errors

```diff
class App extends React.Component {
  constructor(props) {
    super(props);

-   this.state = { lat: null };
+   this.state = { lat: null, errorMessage: '' };

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude });
      },
-     err => console.log(err)
+     err => {
        this.setState({ errorMessage: err.message })
      }
    );
  }

  render() {
-   return <div>Latitude: {this.state.lat}</div>;
+   if (this.state.errorMessage && !this.state.lat) {
+     return <div> Error: {this.state.errorMessage} </div>;
+   }

+   if (!this.state.errorMessage && this.state.lat) {
+     return <div>Latitude: {this.state.lat} </div>;
+   }

+   return <div>Loading&hellip;</div>;
  }
}
```

## Refactor Data Loading to Lifecycle Methods

It is considered best practice to put all data loading related function calls in the `componentDidMount` method, not the `constructor`. Technically the app still should work, but we're going to refactor so we're in line with what's considered best practices.

```diff
class App extends React.Component {
- constructor(props) {
-   super(props);

-   window.navigator.geolocation.getCurrentPosition(
-     position => {
-       this.setState({ lat: position.coords.latitude });
-     },
-     err => {
-       this.setState({ errorMessage: err.message });
-     }
-   );

-   this.state = { lat: null, errorMessage: '' };
- }

+ state = { lat: null, errorMessage: '' };

+ componentDidMount() {
+   window.navigator.geolocation.getCurrentPosition(
+     position => {
+       this.setState({ lat: position.coords.latitude });
+     },
+     err => {
+       this.setState({ errorMessage: err.message });
+     }
+   );
+ }

render() {
```

## Determining Season

Remember the goal is to display a UI based on the user's season, not display the latitude.

```diff
import React from 'react';
import ReactDOM from 'react-dom';
+ import SeasonDisplay from './components/SeasonDisplay';

if (!this.state.errorMessage && this.state.lat) {
- return <div>Latitude: {this.state.lat} </div>;
+ return <SeasonDisplay lat={this.state.lat} />;
}
```

Catch the props in the `./src/components/SeasonDisplay.js` component.

```diff
- const SeasonDisplay = () => {
+ const SeasonDisplay = props => {
+   console.log(props.lat);
    return <div>Season Display</div>;
};
```

To determine the season we'll use the latitude and the current month. Getting the current month is easy in Javascript.

```javascript
new Date.getMonth()
```

Note that this number is zero indexed.

We want a simple string that says either summer or winter, based on the month number from the current date.

```diff
+ const getSeason = (lat, month) => {
+   // april - sept
+   if (month > 2 && month < 9) {
+     if (lat > 0) {
+       return 'summer';
+     } else {
+       return 'winter';
+     }
+   } else {
+     if (lat > 0) {
+       return 'winter';
+     } else {
+       return 'summer';
+     }
+   }
+ };

const SeasonDisplay = props => {
- console.log(props.lat);

+ const season = getSeason(props.lat, new Date().getMonth());
+ console.log(season);

  return <div>Season Display</div>;
};
```

Clean this up using a ternary expressions:

```diff
const getSeason = (lat, month) => {
  // april - sept
-  if (month > 2 && month < 9) {
-    if (lat > 0) {
-      return 'summer';
-    } else {
-      return 'winter';
-    }
+   return lat > 0 ? 'summer' : 'winter';
  } else {
-   if (lat > 0) {
-     return 'winter';
-   } else {
-     return 'summer';
-   }
+   return lat > 0 ? 'winter' : 'summer';
  }
};
```

Update the output using a ternary expression as well:

```diff
const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());
- console.log(season);
+ const text =
+   season === 'winter' ? "Burr, it's chilly!" : "Let's hit the beach!";

- return <div>Season Display</div>;
+ return <div>{text}</div>;
};
```

## Display An Image

Update `./src/components/SeasonDisplay.js` to display an image with the text.

```diff
const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());
  const text =
    season === 'winter' ? "Burr, it's chilly!" : "Let's hit the beach!";

- return <div>{text}</div>
+ return (
+   <div>
+     <p>{text}</p>
+     <div>
+       <img src="./beach.jpg" alt="" />
+     </div>
+   </div>
+ );
};
```

## Create Config Object

Obviously we want to put the correct image based on winter vs summer. We could write out another if statement to check the value of `season` and display the correct image.

```javascript
const image = season === 'winter' ? 'snowflakes.jpg' : 'beach.jpg';
```

This is a bit repetitive, and it could be simplified so our component is easier to maintain in the future.

Build a config variable to hold all of the data for the various states, and then refactor our component to use that config.

### Add Config Variable

```javascript
const seasonConfig = {
  summer: {
    text: 'Lets hit the beach!',
    fileName: 'beach.jpg'
  },
  winter: {
    text: 'Burr, its cold!',
    fileName: 'snowflakes.jpg'
  }
}
```

### Update `SeasonDisplay` With Config

```diff
const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());
- const text =
-   season === 'winter' ? "Burr, it's chilly!" : "Let's hit the beach!";
+ const { text, fileName } = seasonConfig[season];

  return (
    <div>
      <p>{text}</p>
      <div>
-       <img src="./beach.jpg" alt="" />
+       <img src={`./${fileName}`} alt="" />
      </div>
    </div>
  );
};
```

## Add Some Styling

1. Add `./src/screen.css` to `./src/index.js`

      ```diff
      import React from 'react';
      import ReactDOM from 'react-dom';
      import SeasonDisplay from './components/SeasonDisplay';
      + import './screen.css';
      ```

1. Add class names to `./src/components/SeasonDisplay.js`

    ```diff
      const SeasonDisplay = props => {
        const season = getSeason(props.lat, new Date().getMonth());
        const { text, fileName } = seasonConfig[season];

        return (
    -     <div>
    +     <div className={`seasonDisplay ${season}`}>
            <p>{text}</p>
    -       <div>
    +       <div className="seasonDisplay__image">
              <img src={`./${fileName}`} alt="" />
            </div>
          </div>
        );
      };
    ```

## Add a Loading Spinner

- [https://loading.io/css/](https://loading.io/css/)

Disable location tracking to show the loading screens.

- `./src/components/Spinner.js`

1. Add Spinner HTML/JSX From Website

      ```javascript
      import React from 'react';

      const Spinner = () => {
        return (
          <div class="lds-ring">
            <div />
            <div />
            <div />
            <div />
          </div>
        );
      };

      export default Spinner;
      ```

1. Update `./src/index.js`

    ```diff
    - return <div>Loading&hellip;</div>
    + return (
    +   <div className="loading">
    +     Loading&hellip; <Spinner />
    +   </div>
    + );
    ```

## Default Props

Update Spinner component to have default props.

1. Update `./src/index.js` to pass in a `message` prop.

    ```diff
    return (
      <div className="loading">
    -   Loading&hellip; <Spinner />
    +   <Spinner message="Please accept location request." />
      </div>
    );
    ```

1. Update `./src/components/Spinner.js` to include default props.

    ```diff
    - const Spinner = () => {
    + const Spinner = props => {
        return (
    +     <>
    +       <p>{props.message}</p>
            <div class="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
    +    </>
      );
    };

    + Spinner.defaultProps = {
    +  message: 'Loading...'
    + };
    ```

## Avoid Conditionals in Render

In general, always try not to have multiple return statements in a render method. There may be cases where you want to wrap what is being rendered with a parent element, in which case you would have to repeat that JSX multiple times.

Instead, we can make a simple helper function that includes our conditional code for rendering our different views, and call that function in our `render()` method.

1. Update `./src/index.js`

    ```diff
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({ lat: position.coords.latitude });
          },
          err => {
            this.setState({ errorMessage: err.message });
          }
        );
      }

    + renderContent() {
    +   if (this.state.errorMessage && !this.state.lat) {
    +     return <div> Error: {this.state.errorMessage} </div>;
    +   }

    +   if (!this.state.errorMessage && this.state.lat) {
    +     return <SeasonDisplay lat={this.state.lat} />;
    +   }

    +   return (
    +     <div className="loading">
    +       <Spinner message="Please accept location request" />
    +     </div>
    +   );
    + }

      render() {
    -   if (this.state.errorMessage && !this.state.lat) {
    -     return <div> Error: {this.state.errorMessage} </div>;
    -   }

    -   if (!this.state.errorMessage && this.state.lat) {
    -     return <SeasonDisplay lat={this.state.lat} />;
    -   }

    -   return (
    -     <div className="loading">
    -       <Spinner message="Please accept location request" />
    -     </div>
    -   );

    +   return <div>{this.renderContent()}</div>;
      }
    }
    ```