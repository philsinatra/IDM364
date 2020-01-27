import React from 'react';

const Sign = props => {
  const { image, key, name, desc, status } = props.details;
  return (
    <li key={key} className={status}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{desc}</p>
    </li>
  );
};

export default Sign;
