import React, { Component } from 'react';
import NavLink from './NavLink';
import { links } from '../config';

class Nav extends Component {
  // links = ['home', 'about', 'contact'];

  render() {
    return (
      <nav>
        <ul className="nav">
          {links.map(link => (
            <NavLink key={link} linkItem={link} />
          ))}
        </ul>
      </nav>
    );
  }
}

export default Nav;

/* // Hooks

import React from 'react';

const Nav = () => {
  const links = ['home', 'about', 'contact'];

  return (
    <nav>
      <ul className="nav">
        {links.map(link => (
          <li>
            <a href={`#${link.toLowerCase()}`}>{link}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
*/
