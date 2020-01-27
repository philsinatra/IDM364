import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import NotFound from './components/NotFound';

render(
  <Router>
    <React.Fragment>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/about" component={About} /> */}
        <Route
          path="/about"
          // render={props => <About {...props} isCustom="hello" />}
          render={() => <About isCustom="hello" />}
        />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  </Router>,
  document.getElementById('app')
);
