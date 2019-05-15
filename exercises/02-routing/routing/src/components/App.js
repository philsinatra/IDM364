import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Bill from './Bill';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Airport = () => (
  <div>
    <ul>
      <li>Alvin</li>
      <li>Simon</li>
      <li>Theo</li>
    </ul>
  </div>
);

const City = () => (
  <div>
    <ul>
      <li>Philly</li>
      <li>New York</li>
      <li>Boston</li>
    </ul>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/airports" component={Airport} />
          <Route path="/cities" component={City} />
          <Route path="/bill" component={Bill} />
        </Switch>
      </>
    );
  }
}

export default App;
