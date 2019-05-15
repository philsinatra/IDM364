import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/airports">Airports</Link>
      </li>
      <li>
        <Link to="/cities">Cities</Link>
      </li>
      <li>
        <Link to="/bill">Bill</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
