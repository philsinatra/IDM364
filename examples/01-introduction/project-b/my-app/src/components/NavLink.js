import React, { Component } from 'react';

class NavLink extends Component {
  render() {
    return (
      <li>
        <a href={'#' + this.props.linkItem}>{this.props.linkItem}</a>
      </li>
    );
  }
}

export default NavLink;
