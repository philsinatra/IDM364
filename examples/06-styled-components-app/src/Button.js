import React from 'react';
import MyButton from './styles/ButtonStyles';

const Button = () => (
  <MyButton huge>
    Hello Button
    <span role="img" aria-label="poop">
      💩
    </span>
  </MyButton>
);

export default Button;
