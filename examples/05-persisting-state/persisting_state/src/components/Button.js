import React from 'react';

const Button = props => (
  <button
    onClick={() => {
      props.loadSigns();
    }}
  >
    Load Signs
  </button>
);

export default Button;
