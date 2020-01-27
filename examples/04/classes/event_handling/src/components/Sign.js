import React, { Component } from 'react';

class Sign extends Component {
  render() {
    const { image, name, desc } = this.props.details;
    return (
      <li key="this.props.key">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{desc}</p>
      </li>
    );
  }
}

export default Sign;
