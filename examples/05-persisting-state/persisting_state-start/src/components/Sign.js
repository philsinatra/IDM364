import React from 'react';

const Sign = props => {
  const { image, key, name, desc } = props.details;
  return (
    <li key={key}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{desc}</p>
    </li>
  );
};

export default Sign;
